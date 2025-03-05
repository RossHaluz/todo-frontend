import React from "react";
import Billboars from "./boards";
import { Board } from "@/lib/types";

const Sidebar = ({boards}: {boards: Board[]}) => {
  return (
    <div className="h-full lg:border-r overflow-y-auto bg-white shadow-sm p-4">
      <Billboars boards={boards} />
    </div>
  );
};

export default Sidebar;
