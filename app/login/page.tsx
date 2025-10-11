"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // For demo purposes, accept any email and password combination
      // In real app, this would validate against backend
      const mockResponse = {
        success: true,
        data: {
          user: {
            id: "demo-user-123",
            email: email,
            name: email.split("@")[0],
            kycStatus: "verified",
            avatar: "",
          },
          token: `demo_token_${Date.now()}`,
          refreshToken: "refresh_demo_token",
          expiresIn: 3600 * 24 * 7,
        },
      };

      // Set the token directly in localStorage for demo
      localStorage.setItem("auth_token", mockResponse.data.token);
      localStorage.setItem("user_data", JSON.stringify(mockResponse.data.user));

      router.push("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-purple-100 bg-white shadow-xl card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-lg">
            <span className="text-4xl font-bold text-white">Z</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Login to your GoozX account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email or Phone Number
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="btn-primary h-12 w-full font-medium shadow-md hover:shadow-lg transition-all"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/onboarding"
                className="font-semibold text-primary hover:text-accent hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
