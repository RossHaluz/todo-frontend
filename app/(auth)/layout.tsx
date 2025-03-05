import { currentUser } from "@/actions/data";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await currentUser();
  if (user) {
    return redirect("/");
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-400/30">
      <div className="container">{children}</div>
    </div>
  );
};

export default AuthLayout;
