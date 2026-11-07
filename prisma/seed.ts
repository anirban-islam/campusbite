import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding departments and roles...");

  // 1. Seed Roles
  const roles = [
    { name: "admin" },
    { name: "vendor" },
    { name: "customer" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log("Roles seeded: admin, vendor, customer");

  // 2. Seed Departments
  const departments = [
    { name: "Computer Science & Engineering", code: "CSE" },
    { name: "Electrical & Electronic Engineering", code: "EEE" },
    { name: "Bachelor of Business Administration", code: "BBA" },
    { name: "English Department", code: "ENG" },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: { code: dept.code },
      create: dept,
    });
  }
  console.log("Departments seeded: CSE, EEE, BBA, ENG");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });

