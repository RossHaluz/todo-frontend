import { Board } from "@/lib/types";
import React from "react";
import ColumnsList from "./columns-list";
import AddMemberBoard from "./add-member-board";

const Columns = ({ item }: { item: Board | null }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{item?.title}</h3>
        <AddMemberBoard />
      </div>
      <ColumnsList items={item?.columns || []} />
    </div>
  );
};

export default Columns;
