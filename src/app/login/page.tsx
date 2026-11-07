"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header, Footer, Announcement } from "@/components/layout";
import { Logo, Button, Input, Badge, toast } from "@/components/ui";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "@/lib/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your student email";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        description: `Signed in as ${email}. Connected to Campus Smart Pay.`,
        rounded: "sm",
      });
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Announcement Bar */}
      <Announcement variant="subtle" />

      {/* Main Campus Navigation Header */}
      <Header />

      {/* Login Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Card Container */}
          <div className="bg-card border border-border/80 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
            {/* Header: Logo, Badge & Heading */}
            <div className="flex flex-col items-center text-center space-y-2">
              <Logo variant="icon" size="lg" asLink={true} className="mb-1" />

              <div className="inline-flex items-center gap-1.5 pt-1">
                <Badge variant="available" size="sm" rounded="sm">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" />
                  Student Dining Portal
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground pt-1">
                Welcome to Campus<span className="text-primary">Bite</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Sign in with your student credentials to order food and access
                your meal plan balance.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1">
                <Input
                  type="email"
                  label="Student Email"
                  placeholder="student@campus.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
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
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>

              {/* Forgot Password Link (Uses Button Component) */}
              <div className="flex justify-end pt-0.5">
                <Link href="/forgot-pass" className="inline-flex">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
                  >
                    Forgot password?
                  </Button>
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                rounded="sm"
                className="w-full justify-center font-bold text-sm cursor-pointer shadow-xs mt-2"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>

            {/* Bottom Link: Don't have an account? Create one */}
            <div className="pt-2 border-t border-border/60 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="inline-flex">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="p-0 h-auto font-bold text-primary hover:text-primary-hover underline underline-offset-4"
                  >
                    Create one
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
