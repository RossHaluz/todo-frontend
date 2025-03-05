"use client";
import { Column } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTask from "./add-task";
import TaskList from "./task-list";
import ColumnForm from "./column-form";
import { toast } from "sonner";
import api from "@/lib/api";

const ColumnsListItem = ({ item }: { item: Column }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteColumn = async (id: string) => {
    try {
      await api.delete(`/column/delete/${id}`);
      toast.success("Task success delete");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="py-[18px] px-5 bg-gray-200 rounded-md flex flex-col gap-4 min-w-[334px] h-full">
        <div className="flex items-center justify-between">
          <h3>{item?.title}</h3>

          <div className="flex items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 text-[#161616]/[50%]"
                >
                  <Edit size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update column</DialogTitle>
                  <DialogDescription>
                    You can change the title of this colunm
                  </DialogDescription>
                </DialogHeader>
                <ColumnForm initialValues={item} setIsOpen={setIsOpen} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 text-[#161616]/[50%]"
                >
                  <Trash size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete colunm</DialogTitle>
                  <DialogDescription>
                    {" "}
                    This action cannot be undone. Are you sure you want to
                    permanently delete this column from our servers?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDeleteColumn(item?.id)}
                  >
                    Confirm
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <TaskList tasks={item?.tasks} />
      <AddTask columnId={item?.id} />
    </div>
  );
};

export default ColumnsListItem;
