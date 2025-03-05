import { Board } from "@/lib/types";
import React from "react";
import ColumnsList from "./columns-list";

const Columns = ({ item }: { item: Board | null }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium">{item?.title}</h3>
      <ColumnsList items={item?.columns || []} />
    </div>
  );
};

export default Columns;
