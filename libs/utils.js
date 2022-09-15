import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const checkToken = (req) => {
  const token = req.cookies.APP_TOKEN;
  if (!token) {
    return {};
  }
  return jwt.verify(token, "APP_TOKEN");
};

export const createProject = async (req, res, admin) => {
  if (!admin.isAdmin) {
    res.status(401).send({ message: "You dont have right permissions." });
    return;
  }
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    res.status(400).send({ message: "Bad request." });
    return;
  }
  // create project for a user
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    await prisma.project.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });
  } catch (err) {
    res.status(400).end({ message: "email not found" });
    return;
  }
  res.status(201).send({ message: "Project successfully created." });
};

export const getProjects = async (req, res, admin) => {
  const { userId } = req.query;
  if (!userId || isNaN(+userId)) {
    res.status(400).send({ message: "Bad request" });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    if (user) {
      const projects = await prisma.project.findMany({
        where: {
          userId: +user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json(projects);
      return;
    }
    res.status(400);
    res.json({ message: "user not found" });
  } catch (err) {
    res.status(400).json({ message: "user not found" });
    return;
  }
};

export const createTask = async (req, res, user) => {
  if (!user.isAdmin) {
    res.status(401).end({ message: "You dont have right permissions." });
    return;
  }
  const { name, priority } = req.body;
  const { projectId } = req.query;
  if (!name || !priority || isNaN(projectId)) {
    res.status(400);
    res.json({ message: "Bad request" });
    return;
  }
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: +projectId,
      },
    });
    console.log("Project is =====>", project);
    if (project) {
      await prisma.task.create({
        data: {
          name,
          priority,
          projectId: project.id,
        },
      });
      res.status(201);
      res.send({
        message: `Task successfully added to project with id ${projectId}`,
      });
    } else {
      throw Error();
    }
  } catch (err) {
    res.status(400);
    res.send({ message: "Project not found." });
  }
};

export const getTasks = async (req, res, user) => {
  const { projectId } = req.query;
  if (!projectId) {
    res.status(400);
    res.end({ message: "Bad request" });
    return;
  }
  const projects = await prisma.task.findMany({
    where: {
      projectId: +projectId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.status(200);
  res.send(projects);
};

export const deleteTask = async (req, res, admin) => {
  if (!admin.isAdmin) {
    res.status(401);
    res.end({ message: "You dont have right permissions." });
    return;
  }
  const { projectId } = req.query;
  const { taskId } = req.body;
  if (isNaN(projectId) || isNaN(taskId)) {
    res.status(400);
    res.end({ message: "Bad request." });
    return;
  }
  try {
    await prisma.task.delete({
      where: {
        id: +taskId,
        // projectId: +projectId,
      },
    });
    res.status(200);
    res.send({ message: "Task successfully deleted." });
  } catch (error) {
    res.status(400);
    res.end({ messaga: "Task not found" });
  }
};

export const markAsDone = async (req, res, admin) => {
  if (!admin.isAdmin) {
    res.status(401);
    res.end({ message: "You dont have right permissions." });
    return;
  }
  const { projectId } = req.query;
  const { taskId } = req.body;
  if (isNaN(projectId) || isNaN(taskId)) {
    res.status(400);
    res.end({ message: "Bad request." });
    return;
  }
  try {
    await prisma.task.update({
      where: {
        id: +taskId,
      },
      data: {
        isDone: true,
      },
    });
    res.status(200);
    res.send({ message: "Task updated successfully" });
  } catch (error) {
    res.status(400);
    res.end({ messaga: "Task not found" });
  }
};

export const addCommentToTask = async (req, res, user) => {
  const { projectId } = req.query;
  const { taskId, userComment } = req.body;
  if (isNaN(projectId) || isNaN(taskId) || !userComment) {
    res.status(400);
    res.end({ message: "Bad request." });
    return;
  }

  try {
    await prisma.task.update({
      where: {
        id: +taskId,
      },
      data: {
        userComment: userComment,
      },
    });
    res.status(200);
    res.send({ message: "Task updated successfully" });
  } catch (error) {
    res.status(400);
    res.end({ messaga: "Task not found" });
  }
};
