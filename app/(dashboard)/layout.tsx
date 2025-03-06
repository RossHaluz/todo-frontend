import { currentUser, getAllBoards } from "@/actions/data";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DachboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }

  const boards = (await getAllBoards()) || { boards: [], memberBoards: [] };

  return (
    <div className="h-full">
      <div className="lg:pl-64 max-h-max fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden lg:flex h-full w-64 flex-col fixed inset-y-0 border-r z-50">
        <Sidebar boards={boards.boards} memberBoards={boards.memberBoards} />
      </div>
      <main className="lg:pl-72 pt-20 h-full pr-20">{children}</main>
    </div>
  );
};

export default DachboardLayout;
