"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header, Footer, Announcement } from "@/components/layout";
import { Logo, Button, Input, Badge, toast } from "@/components/ui";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  Store,
  CreditCard,
} from "@/lib/icons";

interface Department {
  id: string;
  name: string;
  code: string | null;
}

const fallbackDepartments: Department[] = [
  { id: "5032387c-55b3-480c-906d-b1d71feba6c6", name: "Computer Science & Engineering", code: "CSE" },
  { id: "f5bc6694-6a34-4b82-95c6-7bf2920eb2ab", name: "Electrical & Electronic Engineering", code: "EEE" },
  { id: "2845c70d-36db-4a8c-a624-96c203e959fa", name: "Bachelor of Business Administration", code: "BBA" },
  { id: "8bd74333-8f3f-4dae-adc9-d66ff29899a3", name: "English Department", code: "ENG" },
];

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Campus Attributes
  const [departments, setDepartments] = useState<Department[]>(fallbackDepartments);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(fallbackDepartments[0].id);
  const [affiliationType, setAffiliationType] = useState<"STUDENT" | "FACULTY" | "STAFF">("STUDENT");
  const [studentId, setStudentId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [roleName, setRoleName] = useState<"customer" | "vendor">("customer");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch departments from API
  useEffect(() => {
    fetch("/api/departments")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.departments?.length > 0) {
          setDepartments(data.departments);
          setSelectedDeptId(data.departments[0].id);
        }
      })
      .catch(() => {
        setSelectedDeptId(fallbackDepartments[0].id);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Affiliation conditional validation
    if (affiliationType === "STUDENT" && !studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    if (affiliationType === "FACULTY" && !employeeId.trim()) {
      newErrors.employeeId = "Faculty/Employee ID is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber: phoneNumber.trim() || undefined,
          password,
          affiliationType,
          studentId: affiliationType === "STUDENT" ? studentId.trim() : undefined,
          employeeId: affiliationType === "FACULTY" ? employeeId.trim() : undefined,
          departmentId: selectedDeptId || undefined,
          roleName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Registration failed", { rounded: "sm" });
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully!", {
        description: `Welcome to CampusBite, ${firstName}!`,
        rounded: "sm",
      });

      // Redirect based on role
      router.push(data.redirectTo || (roleName === "vendor" ? "/dashboard" : "/account"));
    } catch {
      toast.error("Network error. Please try again.", { rounded: "sm" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Announcement variant="subtle" />
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="bg-card border border-border/80 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2">
              <Logo variant="icon" size="lg" asLink={true} className="mb-1" />

              <div className="inline-flex items-center gap-1.5 pt-1">
                <Badge variant="available" size="sm" rounded="sm">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" />
                  Campus Registration Portal
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground pt-1">
                Join Campus<span className="text-primary">Bite</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Create an account to order cafeteria meals, access smart pay, or
                manage counter orders.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Role Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoleName("customer")}
                    className={`py-2 px-3 rounded-sm border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      roleName === "customer"
                        ? "bg-primary-subtle text-primary border-primary-300"
                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Customer / Diner
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleName("vendor")}
                    className={`py-2 px-3 rounded-sm border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      roleName === "vendor"
                        ? "bg-primary-subtle text-primary border-primary-300"
                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    Dining Vendor
                  </button>
                </div>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Alex"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName)
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                  }}
                  error={errors.firstName}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  disabled={isLoading}
                />

                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Rivera"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName)
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                  }}
                  error={errors.lastName}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  disabled={isLoading}
                />
              </div>

              {/* Email & Phone */}
              <Input
                type="email"
                label="Campus Email"
                placeholder="name@campus.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
                variant="outline"
                inputSize="md"
                rounded="sm"
                autoComplete="email"
                disabled={isLoading}
              />

              <Input
                type="tel"
                label="Phone Number (Optional)"
                placeholder="+880 1700 000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                leftIcon={<Phone className="w-4 h-4 text-muted-foreground" />}
                variant="outline"
                inputSize="md"
                rounded="sm"
                disabled={isLoading}
              />

              {/* Password */}
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: "" }));
                }}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4 text-muted-foreground" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                variant="outline"
                inputSize="md"
                rounded="sm"
                autoComplete="new-password"
                disabled={isLoading}
              />

              {/* Department Dropdown (CSE, EEE, BBA, ENG) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    disabled={isLoading}
                    className="w-full h-10 px-3 text-sm font-medium rounded-sm border border-border bg-card text-foreground hover:border-primary-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.code ? `[${dept.code}] ` : ""}
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Affiliation Type Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                  Campus Affiliation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["STUDENT", "FACULTY", "STAFF"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAffiliationType(type)}
                      className={`py-2 px-2.5 rounded-sm border text-xs font-bold transition-all cursor-pointer text-center ${
                        affiliationType === type
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {type === "STUDENT"
                        ? "Student"
                        : type === "FACULTY"
                        ? "Faculty"
                        : "Staff"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional ID Fields based on Affiliation */}
              {affiliationType === "STUDENT" && (
                <Input
                  type="text"
                  label="Student ID"
                  placeholder="e.g. 21-4421-1"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    if (errors.studentId)
                      setErrors((prev) => ({ ...prev, studentId: "" }));
                  }}
                  error={errors.studentId}
                  leftIcon={<GraduationCap className="w-4 h-4 text-muted-foreground" />}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  disabled={isLoading}
                />
              )}

              {affiliationType === "FACULTY" && (
                <Input
                  type="text"
                  label="Faculty / Employee ID"
                  placeholder="e.g. FAC-2049"
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                    if (errors.employeeId)
                      setErrors((prev) => ({ ...prev, employeeId: "" }));
                  }}
                  error={errors.employeeId}
                  leftIcon={<CreditCard className="w-4 h-4 text-muted-foreground" />}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  disabled={isLoading}
                />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                rounded="sm"
                className="w-full justify-center font-bold text-sm cursor-pointer shadow-xs mt-3"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create Account
              </Button>
            </form>

            {/* Bottom Link: Already have an account? Sign In */}
            <div className="pt-2 border-t border-border/60 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="inline-flex">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="p-0 h-auto font-bold text-primary hover:text-primary-hover underline underline-offset-4"
                  >
                    Sign In
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
