"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  username: z.string().min(1, "Please provide a username"),
  email: z
    .string()
    .min(1, "Please provide an email address")
    .email("Please provide a valid email address"),
  phoneNumber: z.string().min(1, "Please provide a phone number"),
  password: z
    .string()
    .min(1, "Please provide a password")
    .min(6, "Password must be at least 6 characters long"),
  role: z.string().min(1, "Please provide a role"),
});

const CreateUserPage = () => {
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
              <FormLabel className="mb-1 mt-0.5 w-96">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 mt-0.5 w-96">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 mt-0.5 w-96">Phone number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Phone number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 mt-0.5 w-96">Password</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Phone number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 mt-0.5 w-96">Role</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Role" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Create user</Button>
      </form>
    </Form>
  );
};
export default CreateUserPage;
