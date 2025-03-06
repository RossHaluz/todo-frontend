import React from "react";
import CreateBillboard from "./create-billboard";
import BoardList from "./boards-list";
import { Board, MemberBoard } from "@/lib/types";

const Billboars = ({
  boards,
  memberBoards,
}: {
  boards: Board[];
  memberBoards: MemberBoard[];
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-[#161616]/[50%]">My billboards</h3>
          <CreateBillboard />
        </div>
        <div className="max-h-20 overflow-y-auto">
          <BoardList boards={boards} />
        </div>
      </div>

      <div className="flex flex-col gap-2 py-4 border-t border-[#161616]/[50%]">
        <h3 className="text-[#161616]/[50%]">Member boards</h3>
        <BoardList boards={memberBoards} />
      </div>
    </div>
  );
};

export default Billboars;
