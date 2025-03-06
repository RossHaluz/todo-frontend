import React, { FC } from "react";
import Billboars from "./boards";
import { Board, MemberBoard } from "@/lib/types";

const Sidebar = ({
  boards,
  memberBoards,
}: {
  boards: Board[] | [];
  memberBoards: MemberBoard[] | [];
}) => {
  return (
    <div className="h-full lg:border-r overflow-y-auto bg-white shadow-sm p-4">
      <Billboars boards={boards} memberBoards={memberBoards} />
    </div>
  );
};

export default Sidebar;
