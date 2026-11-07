import "dotenv/config";
import { scryptSync, randomBytes } from "node:crypto";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  console.log("Seeding database (roles, departments, admin user)...");

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

  // 3. Seed Default Admin User
  const adminEmail = "admin@campusbite.com";
  const adminPassword = "admin123";
  const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });
  const cseDept = await prisma.department.findFirst({ where: { code: "CSE" } });

  if (!adminRole) {
    throw new Error("Admin role not found");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
    include: { roles: true },
  });

  if (!existingAdmin) {
    const createdAdmin = await prisma.user.create({
      data: {
        firstName: "System",
        lastName: "Admin",
        email: adminEmail,
        phoneNumber: "+8801700000001",
        passwordHash: hashPassword(adminPassword),
        affiliationType: "FACULTY",
        employeeId: "EMP-ADMIN-001",
        departmentId: cseDept?.id || null,
        roles: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
    });
    console.log(`Admin user created: ${createdAdmin.email}`);
  } else {
    // Ensure admin has the admin role
    const hasAdminRole = existingAdmin.roles.some((r) => r.roleId === adminRole.id);
    if (!hasAdminRole) {
      await prisma.userRole.create({
        data: {
          userId: existingAdmin.id,
          roleId: adminRole.id,
        },
      });
    }
    // Update password hash to match admin123
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        passwordHash: hashPassword(adminPassword),
      },
    });
    console.log(`Admin user updated: ${existingAdmin.email}`);
  }
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

