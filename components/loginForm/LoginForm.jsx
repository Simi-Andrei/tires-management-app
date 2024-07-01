"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogIn, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().min(1, "Please enter your email").email(),
  password: z.string().min(1, "Please enter your password"),
});

const LoginForm = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const email = values.email;
    const password = values.password;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("An error occured. Please check credentials.");
        return;
      } else {
        setError("");
        router.replace("dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Your password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="mt-6 text-sm text-center text-rose-400">
            <TriangleAlert className="size-4 inline mr-1 mb-1" />
            {error}
          </p>
        )}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full mt-6"
        >
          {form.formState.isSubmitting ? (
            <LoaderCircle className="animate-spin size-4" />
          ) : (
            <>
              <LogIn className="size-4 mr-1.5" />
              Login
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
