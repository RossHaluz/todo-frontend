"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Column } from "@/lib/types";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import CreateColumnForm from "./column-form";
import ColumnsListItem from "./columns-list-item";

const ColumnsList = ({ items }: { items: Column[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="py-[14px] px-[74px] rounded-md bg-gray-200 flex items-center justify-between gap-4 max-w-max">
        <Dialog defaultOpen={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="p-0 cursore-pointer">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new column</DialogTitle>
              <DialogDescription>
                After this, you can add/edit or delete your tasks of this colunm
              </DialogDescription>
            </DialogHeader>
            <CreateColumnForm setIsOpen={setIsOpen} initialValues={null} />
          </DialogContent>
        </Dialog>
        Add anothrer column
      </div>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4 max-w-max">
          {items?.map((item) => {
            return <ColumnsListItem item={item} key={item?.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ColumnsList;
