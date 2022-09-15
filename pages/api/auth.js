import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import prisma from "../../libs/prisma";

export default async function sigin(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Wrong http verb." });
    return;
  }
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: "Email and password are required." });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        time: Date.now(),
      },
      "APP_TOKEN",
      {
        expiresIn: "8h",
      }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("APP_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res
      .status(200)
      .json({ isAdmin: user.isAdmin, name: user.name, email: user.email });
    return;
  }
  res.status(401).json({ message: "Email or password is wrong." });
}
