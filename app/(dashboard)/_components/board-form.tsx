"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { Board } from "@/lib/types";

interface BoardFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: Board | null;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const BoardForm: FC<BoardFormProps> = ({ setIsOpen, initialValues }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues ? initialValues?.title : "",
    },
  });

  const message = initialValues
    ? "Board success updated"
    : "Board success created!";

  const btnText = initialValues ? "Update board" : "Create board";

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialValues) {
        await api.patch(`/board/update/${initialValues?.id}`, values);
      } else if (!initialValues) {
        await api.post("/board/create", values);
      }
      setIsOpen(false);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New board</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={!isValid || isSubmitting}
        >
          {btnText}
        </Button>
      </form>
    </Form>
  );
};

export default BoardForm;
