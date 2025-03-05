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
import { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: Task | null;
  columnId?: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isChecked: z.boolean().default(false).optional(),
});

const TaskForm: FC<TaskFormProps> = ({
  setIsOpen,
  initialValues,
  columnId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues ? initialValues?.title : "",
      description: initialValues ? initialValues?.description : "",
      isChecked: initialValues ? initialValues?.isChecked : false,
    },
  });

  const message = initialValues
    ? "Task success updated"
    : "Task success created!";

  const btnText = initialValues ? "Update task" : "Create task";

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialValues) {
        await api.patch(`/task/update/${initialValues?.id}`, values);
      } else if (!initialValues) {
        await api.post(`/task/create/${columnId}`, values);
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
              <FormLabel>Title task</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description task</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isChecked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>You can mark this task as complited</FormLabel>
              </div>
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

export default TaskForm;
