"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import BoardForm from "./board-form";

const CreateBillboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-[14px] border-y border-[#161616]/[10%] flex items-center justify-between gap-2">
      <h3 className="w-[76px] text-[#161616] text-base font-bold">
        Create a new board
      </h3>
      <Dialog defaultOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button type="button">
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new board</DialogTitle>
            <DialogDescription>
              After this, you can add/edit or delete your colomn or tasks
            </DialogDescription>
          </DialogHeader>
          <BoardForm initialValues={null} setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBillboard;
