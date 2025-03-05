"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, "Email is require"),
  password: z.string().min(1, "Password is require"),
});

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, serErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/user/login`,
        values
      );

      Cookies.set("__token", data?.data?.token, {
        expires: 7,
        path: "",
      });

      toast.success("Success sign in");
      return router.push("/");
    } catch (error: any) {
      console.log(error);
      serErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md shadow-2xl p-4 lg:p-6 bg-white max-w-[500px] mx-auto flex flex-col gap-4">
        <h2 className="text-lg lg:text-2xl font-medium text-center">
          Sign in to admin-panel
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {errorMessage && (
              <p className="text-base text-red-500 font-medium">
                {errorMessage}
              </p>
            )}
            <Button type="submit">Sing in</Button>
          </form>
        </Form>
      </div>
      <h3 className="text-base font-medium text-center">
        Dont't have account?{" "}
        <Link href="/register" className="text-blue-400 underline">
          Sign up
        </Link>
      </h3>
    </div>
  );
};

export default LoginForm;
