import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies.APP_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "APP_TOKEN");
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "APP_TOKEN");
  return user;
};
