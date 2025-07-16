"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "../action";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useActionState } from "react";
import Link from "next/link";

export default function Page() {
  const [state, action, pending] = useActionState(loginAction);

  return (
    <main>
      <div className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl text-gray-900 py-3">
            Welcome Back, JobFellas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
            type="button">
            <Image
              src="/images/icon-google.png"
              alt="icon-google"
              width={20}
              height={20}
            />
            <span className="text-indigo-600">Login with Google</span>
          </Button>
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">Or Sign with email</span>
            </div>
          </div>
          {/* Login Form */}
          <form action={action} className="space-y-4">
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-600">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                required
                className={`w-full ${
                  state?.fieldErrors?.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-600">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
                className={`w-full ${
                  state?.fieldErrors?.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-gray-600">
                Remember me
              </Label>
            </div>
            {state?.status === "error" && (
              <p className="text-red-500">{state?.message}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={pending}>
              Login
            </Button>
            <div>
              <div>
                <p className="text-sm text-gray-700">
                  Dont have an account?{" "}
                  <Link href="/register" className="text-indigo-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </div>
    </main>
  );
}
