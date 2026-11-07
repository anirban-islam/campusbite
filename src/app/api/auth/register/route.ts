import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, setAuthSession, type SessionUser } from "@/lib/auth";
import { AffiliationType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      affiliationType,
      studentId,
      employeeId,
      departmentId,
      roleName = "customer",
      avatarUrl,
    } = body;

    // 1. Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Affiliation specific validation
    if (affiliationType === "STUDENT" && !studentId?.trim()) {
      return NextResponse.json(
        { success: false, error: "Student ID is required for students" },
        { status: 400 }
      );
    }

    if (affiliationType === "FACULTY" && !employeeId?.trim()) {
      return NextResponse.json(
        { success: false, error: "Employee ID is required for faculty" },
        { status: 400 }
      );
    }

    // 3. Check for existing email / studentId / employeeId
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          ...(studentId ? [{ studentId: studentId.trim() }] : []),
          ...(employeeId ? [{ employeeId: employeeId.trim() }] : []),
          ...(phoneNumber ? [{ phoneNumber: phoneNumber.trim() }] : []),
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      if (studentId && existingUser.studentId === studentId.trim()) {
        return NextResponse.json(
          { success: false, error: "An account with this Student ID already exists" },
          { status: 409 }
        );
      }
      if (employeeId && existingUser.employeeId === employeeId.trim()) {
        return NextResponse.json(
          { success: false, error: "An account with this Employee ID already exists" },
          { status: 409 }
        );
      }
      if (phoneNumber && existingUser.phoneNumber === phoneNumber.trim()) {
        return NextResponse.json(
          { success: false, error: "An account with this phone number already exists" },
          { status: 409 }
        );
      }
    }

    // 4. Resolve Target Role
    const validRoleName = ["admin", "vendor", "customer"].includes(roleName.toLowerCase())
      ? roleName.toLowerCase()
      : "customer";

    let role = await prisma.role.findUnique({
      where: { name: validRoleName },
    });

    if (!role) {
      role = await prisma.role.create({
        data: { name: validRoleName },
      });
    }

    // 4.5. Resolve Department ID safely
    let resolvedDepartmentId: string | null = null;
    if (departmentId && typeof departmentId === "string" && departmentId.trim() !== "") {
      const trimmedDept = departmentId.trim();
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmedDept);
      if (isUuid) {
        const dept = await prisma.department.findUnique({
          where: { id: trimmedDept },
        });
        if (dept) {
          resolvedDepartmentId = dept.id;
        }
      } else {
        // Fallback: match by code (e.g. dept-cse -> CSE) or name
        const cleanCode = trimmedDept.replace(/^dept-/i, "").toUpperCase();
        const dept = await prisma.department.findFirst({
          where: {
            OR: [
              { code: { equals: cleanCode, mode: "insensitive" } },
              { name: { contains: cleanCode, mode: "insensitive" } },
            ],
          },
        });
        if (dept) {
          resolvedDepartmentId = dept.id;
        }
      }
    }

    // 5. Hash password and create user
    const passwordHash = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        phoneNumber: phoneNumber?.trim() || null,
        passwordHash,
        avatarUrl: avatarUrl || null,
        affiliationType: affiliationType ? (affiliationType as AffiliationType) : null,
        studentId: studentId?.trim() || null,
        employeeId: employeeId?.trim() || null,
        departmentId: resolvedDepartmentId,
        roles: {
          create: {
            roleId: role.id,
          },
        },
      },
      include: {
        department: true,
        roles: {
          include: { role: true },
        },
      },
    });

    // 6. Build session and set cookie
    const primaryRole = (validRoleName as "admin" | "vendor" | "customer");
    const sessionUser: SessionUser = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: primaryRole,
      affiliationType: newUser.affiliationType,
      studentId: newUser.studentId,
      employeeId: newUser.employeeId,
      department: newUser.department,
      avatarUrl: newUser.avatarUrl,
    };

    await setAuthSession(sessionUser);

    const redirectTo = ["admin", "vendor"].includes(primaryRole)
      ? "/dashboard"
      : "/account";

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: sessionUser,
        redirectTo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

