import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { FC, useState } from "react";
import TaskForm from "./task-form";

interface AddTaskProps {
  columnId: string;
}

const AddTask: FC<AddTaskProps> = ({ columnId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="p-0">
          <Plus size={16} />
          Add anothe task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>
            After this you cat manage your tast.
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          setIsOpen={setIsOpen}
          initialValues={null}
          columnId={columnId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
