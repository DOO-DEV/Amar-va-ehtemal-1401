import { validateRoute } from "../../../libs/validateRoute";
import { createProject, getProjects } from "../../../libs/utils";
import prisma from "../../../libs/prisma";

export default validateRoute(async (req, res, user) => {
  switch (req.method) {
    case "POST": {
      await createProject(req, res, user);
      return;
    }
    default:
      res.status(400).send({ message: "Bad request." });
  }
});
