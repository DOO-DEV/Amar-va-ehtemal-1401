import { validateRoute } from "../../libs/validateRoute";
import prisma from "../../libs/prisma";

export default validateRoute(async (req, res, user) => {
  if (!user.isAdmin) {
    res.status(400).end({ message: "You dont have right permission" });
    return;
  }
  if (req.method !== "GET") {
    res.status(400).end({ message: "Bad request" });
    return;
  }
  const users = await prisma.user.findMany({
    where: {
      isAdmin: false,
    },
  });
  const result = users.map((user) => ({
    email: user.email,
    userId: user.id,
    name: user.name,
  }));
  res.status(200).send(result);
});
