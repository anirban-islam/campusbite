"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header, Footer, Announcement } from "@/components/layout";
import { Logo, Button, Input, Badge, toast } from "@/components/ui";
import { Mail, ArrowLeft, ArrowRight, Check } from "@/lib/icons";

export const instant = true;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid student email address");
      return;
    }

    setError(undefined);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset email sent!", {
        description: `Check your inbox at ${email} for instructions.`,
        rounded: "sm",
      });
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Announcement Bar */}
      <Announcement variant="subtle" />

      {/* Main Campus Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-card border border-border/80 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-2">
              <Logo variant="icon" size="lg" asLink={true} className="mb-1" />

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Reset Password
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Enter your campus email address and we will send you a link to
                reset your password.
              </p>
            </div>

            {isSubmitted ? (
              <div className="space-y-4">
                <div className="p-4 rounded-sm bg-primary-subtle text-primary border border-primary-200 text-sm flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-foreground">
                      Reset link sent!
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We sent password recovery instructions to{" "}
                      <span className="font-semibold text-foreground">
                        {email}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <Link href="/login" className="block w-full">
                  <Button
                    variant="primary"
                    size="md"
                    rounded="sm"
                    className="w-full justify-center font-bold text-sm cursor-pointer shadow-xs"
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="Student Email"
                  placeholder="student@campus.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(undefined);
                  }}
                  error={error}
                  leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
                  variant="outline"
                  inputSize="md"
                  rounded="sm"
                  autoComplete="email"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rounded="sm"
                  className="w-full justify-center font-bold text-sm cursor-pointer shadow-xs mt-2"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Send Reset Link
                </Button>
              </form>
            )}

            {/* Back to Login Link */}
            <div className="pt-2 border-t border-border/60 text-center">
              <Link href="/login" className="inline-flex">
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="p-0 h-auto font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5"
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                >
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
