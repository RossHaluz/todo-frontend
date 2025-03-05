"use client";
import React from "react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("__token");
    router.refresh();
    router.push("/login");
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="flex items-center gap-4"
    >
      Log out <LogOut />
    </Button>
  );
};

export default LogoutBtn;
