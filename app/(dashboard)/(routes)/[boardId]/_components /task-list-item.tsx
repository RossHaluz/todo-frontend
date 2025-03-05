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
import { Task } from "@/lib/types";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import TaskForm from "./task-form";

const TaskListItem = ({ item }: { item: Task }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 rounded-md bg-gray-200 flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold">{item?.title}</h3>
        <p>{item?.description}</p>
        {item?.isChecked ? (
          <span className="text-green-400 font-medium">Task is complite</span>
        ) : (
          <span className="text-red-300 font-medium">Task is not complet</span>
        )}
      </div>
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
              <DialogTitle>Update task</DialogTitle>
              <DialogDescription>
                You can change the title of this task
              </DialogDescription>
            </DialogHeader>
            <TaskForm initialValues={item} setIsOpen={setIsOpen} />
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
              <DialogTitle>Delete task</DialogTitle>
              <DialogDescription>
                {" "}
                This action cannot be undone. Are you sure you want to
                permanently delete this task from our servers?
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskListItem;
