"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Separator } from "@/registry/default/ui/separator";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1.95068C17.525 1.95068 22 6.42568 22 11.9507C21.9995 14.0459 21.3419 16.0883 20.1198 17.7902C18.8977 19.4922 17.1727 20.768 15.1875 21.4382C14.6875 21.5382 14.5 21.2257 14.5 20.9632C14.5 20.6257 14.5125 19.5507 14.5125 18.2132C14.5125 17.2757 14.2 16.6757 13.8375 16.3632C16.0625 16.1132 18.4 15.2632 18.4 11.4257C18.4 10.3257 18.0125 9.43818 17.375 8.73818C17.475 8.48818 17.825 7.46318 17.275 6.08818C17.275 6.08818 16.4375 5.81318 14.525 7.11318C13.725 6.88818 12.875 6.77568 12.025 6.77568C11.175 6.77568 10.325 6.88818 9.525 7.11318C7.6125 5.82568 6.775 6.08818 6.775 6.08818C6.225 7.46318 6.575 8.48818 6.675 8.73818C6.0375 9.43818 5.65 10.3382 5.65 11.4257C5.65 15.2507 7.975 16.1132 10.2 16.3632C9.9125 16.6132 9.65 17.0507 9.5625 17.7007C8.9875 17.9632 7.55 18.3882 6.65 16.8757C6.4625 16.5757 5.9 15.8382 5.1125 15.8507C4.275 15.8632 4.775 16.3257 5.125 16.5132C5.55 16.7507 6.0375 17.6382 6.15 17.9257C6.35 18.4882 7 19.5632 9.5125 19.1007C9.5125 19.9382 9.525 20.7257 9.525 20.9632C9.525 21.2257 9.3375 21.5257 8.8375 21.4382C6.8458 20.7752 5.11342 19.502 3.88611 17.799C2.65881 16.096 1.9989 14.0498 2 11.9507C2 6.42568 6.475 1.95068 12 1.95068Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Pattern() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4">
            <Field>
              <FieldLabel htmlFor="email-12">Email address</FieldLabel>
              <Input
                id="email-12"
                placeholder="name@example.com"
                required
                type="email"
              />
            </Field>
            <Field>
              <div className="flex w-full items-center justify-between">
                <FieldLabel htmlFor="password-12">Password</FieldLabel>
                <a
                  className="text-muted-foreground text-xs underline-offset-4 hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="password-12"
                  placeholder="Password"
                  required
                  type={isVisible ? "text" : "password"}
                />
                <InputGroupAddon align="inline-end">
                  <Button
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    onClick={() => setIsVisible(!isVisible)}
                    size="icon-sm"
                    variant="ghost"
                  >
                    {isVisible ? (
                      <EyeOffIcon aria-hidden="true" />
                    ) : (
                      <EyeIcon aria-hidden="true" />
                    )}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
          <div className="flex flex-col gap-6">
            <Button className="w-full" type="submit">
              Sign in
            </Button>
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <Separator className="flex-1" />
              <span>Or continue with</span>
              <Separator className="flex-1" />
            </div>
            <Button className="w-full" variant="outline">
              <GitHubIcon />
              GitHub
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-muted-foreground text-xs">
          By clicking continue, you agree to our{" "}
          <a
            className="underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Terms of Service
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
