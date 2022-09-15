import { validateRoute } from "../../../../libs/validateRoute";
import {
  createTask,
  getTasks,
  deleteTask,
  markAsDone,
  addCommentToTask,
} from "../../../../libs/utils";
import prisma from "../../../../libs/prisma";

export default validateRoute(async (req, res, user) => {
  switch (req.method) {
    case "POST": {
      await createTask(req, res, user);
      return;
    }
    case "GET": {
      await getTasks(req, res, user);
      return;
    }
    case "DELETE": {
      await deleteTask(req, res, user);
      return;
    }
    case "PATCH": {
      await markAsDone(req, res, user);
      return;
    }
    case "PUT": {
      await addCommentToTask(req, res, user);
    }
    default:
      res.status(400).send({ message: "Bad request." });
  }
});
