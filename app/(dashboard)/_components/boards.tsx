import React from "react";
import CreateBillboard from "./create-billboard";
import BoardList from "./boards-list";
import { Board } from "@/lib/types";

const Billboars = ({ boards }: { boards: Board[] }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#161616]/[50%]">My billboards</h3>
        <CreateBillboard />
      </div>
      <BoardList boards={boards} />
    </div>
  );
};

export default Billboars;
