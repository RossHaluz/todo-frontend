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
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddMemberForm from "./add-member-form";

const AddMemberBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus size={16} />
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add member to board</DialogTitle>
          <DialogDescription>You can add user to this board</DialogDescription>
        </DialogHeader>
        <AddMemberForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberBoard;
