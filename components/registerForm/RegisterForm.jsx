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
import {
  CircleCheck,
  LoaderCircle,
  TriangleAlert,
  UserRoundPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, "Please provide a username"),
  email: z.string().min(1, "Please provide an email").email(),
  phoneNumber: z.string().min(1, "Please provide a phone number"),
  password: z.string().min(1, "Please provide a password"),
  role: z.string().min(1, "Please select role"),
});

const RegisterForm = () => {
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
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error);
      } else {
        setError("");
        toast("User created succesfully!", {
          icon: <CircleCheck className="size-4" />,
        });
        form.reset();
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  {...field}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
              <UserRoundPlus className="size-4 mr-1.5" />
              Create user
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
