"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const DEFAULT_ERROR = {
  error: false,
  message: "",
};

//client components (CSR)
export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR);
  const validateForm = ({ email, password }) => {
    if (email === "") {
      setError({
        error: true,
        message: "Email is required",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "Password is required",
      });
      return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError({
        error: true,
        message: "Email is Invalid",
      });
      return false;
    }

    setError(DEFAULT_ERROR);
    return true;

    return true;
  };
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("validate", validateForm({ email, password }));

    if (validateForm({ email, password })) {
      await signIn.email(
        { email, password },
        {
          onSuccess: () => {
            setLoading(false)
           redirect("/admin")
          },
          onError: (ctx) => {
            setError({
              error: true,
              message: ctx.error.message,
            });
            setLoading(false)
            //loading false
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to login to account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                ></Input>
              </div>

              <div className="grid gap-3">
                <div className=" flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                ></Input>
              </div>
              {/* error msg here */}
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap=3">
                <Button type="submit" className="w-full" >
                  {isLoading && <Loader2 className="animate-spin" />} Login
                </Button>
              </div>

              <div className="flex flex-col gap=3">
                <Button className="w-full" variant="outline" >
                  Login with Google
                </Button>
              </div>
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
