"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { trpc } from "@/trpc/client";
import { LuLogIn } from "react-icons/lu";
import Link from "next/link";

// Definisikan skema Zod (Tidak Berubah)
const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      router.push("/admin/dashboard");
      toast.success("Login berhasil!");
    },
    onError: (error) => {
      toast.error(`Login gagal: ${error.message}`);
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-3 rounded-full bg-blue-100">
            <LuLogIn className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Login
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="alamat@email.com"
                      type="email"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800"
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
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Minimal 8 karakter"
                        type={showPassword ? "text" : "password"}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <FaEye className="w-5 h-5" />
                        ) : (
                          <IoIosEyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/auth/forgot-password"
              className="text-[#1581bc] text-sm font-medium hover:text-blue-500 transition"
            >
              Lupa Password?
            </Link>

            <Button
              type="submit"
              className="w-full h-11 text-white bg-[#1581bc] hover:bg-[#1895d9] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg mt-8"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
