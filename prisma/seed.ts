import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function run() {
  const salt = bcrypt.genSaltSync();
  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      isAdmin: true,
      name: "ali",
      password: bcrypt.hashSync("admin", salt),
    },
  });
  await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      isAdmin: false,
      name: "negin",
      password: bcrypt.hashSync("user", salt),
    },
  });
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
