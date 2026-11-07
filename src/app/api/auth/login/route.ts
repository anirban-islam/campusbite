import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, setAuthSession, type SessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Find user by email with roles and department
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        department: true,
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Verify password
    const isPasswordValid = verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Determine highest priority role (admin > vendor > customer)
    const roleNames = user.roles.map((ur) => ur.role.name.toLowerCase());
    let primaryRole: "admin" | "vendor" | "customer" = "customer";
    if (roleNames.includes("admin")) {
      primaryRole = "admin";
    } else if (roleNames.includes("vendor") || roleNames.includes("vandor")) {
      primaryRole = "vendor";
    }

    // 4. Build session object and set cookie
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: primaryRole,
      affiliationType: user.affiliationType,
      studentId: user.studentId,
      employeeId: user.employeeId,
      department: user.department,
      avatarUrl: user.avatarUrl,
    };

    await setAuthSession(sessionUser);

    // 5. Redirection rule:
    // admin or vendor -> /dashboard
    // customer -> /account
    const redirectTo = ["admin", "vendor"].includes(primaryRole)
      ? "/dashboard"
      : "/account";

    return NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: sessionUser,
      redirectTo,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

