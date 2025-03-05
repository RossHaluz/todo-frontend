import { getFirstBoardByUser } from "@/actions/data";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const board = await getFirstBoardByUser();

  if (board) {
    redirect(`/${board?.id}`);
  }
  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <p className="text-center text-[#161616] w-[360px]">
        Before starting your project, it is essential to create a board to
        visualize and track all the necessary tasks and milestones. This board
        serves as a powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </p>
    </div>
  );
};

export default DashboardPage;
