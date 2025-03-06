"use client";
import { Button } from "@/components/ui/button";
import { Board } from "@/lib/types";
import { Edit, Trash } from "lucide-react";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import BoardForm from "./board-form";
import { toast } from "sonner";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface BoardListItemProps {
  item: Board;
}

const BoardListItem: FC<BoardListItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const hadleDeleteBoard = async (id: string) => {
    try {
      await api.delete(`/board/delete/${item?.id}`);
      setIsOpen(false);
      toast.success("Board success delete");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <li
      className={cn(
        "py-5 px-3 flex items-center justify-between rounded-md gap-2 text-[#161616]/[50%]",
        {
          "bg-[#F6F6F7] text-[161616]": item?.id === params?.boardId,
        }
      )}
      key={item?.id}
    >
      <Link href={`/${item?.id}`}>{item?.title}</Link>

      <div className="flex items-center gap-2">
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
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
              <DialogTitle>Update board</DialogTitle>
              <DialogDescription>
                You can change the title of your board.
              </DialogDescription>
            </DialogHeader>
            <BoardForm setIsOpen={setIsOpen} initialValues={item} />
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
              <DialogTitle>Delete board</DialogTitle>
              <DialogDescription>
                {" "}
                This action cannot be undone. Are you sure you want to
                permanently delete this board from our servers?
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={() => hadleDeleteBoard(item?.id)}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};

export default BoardListItem;
