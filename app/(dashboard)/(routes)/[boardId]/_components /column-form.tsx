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
import { useParams, useRouter } from "next/navigation";
import { Column } from "@/lib/types";

interface ColumnFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: Column | null;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const ColumnForm: FC<ColumnFormProps> = ({ setIsOpen, initialValues }) => {
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues ? initialValues?.title : "",
    },
  });

  const message = initialValues
    ? "Column success update"
    : "Column success created";
  const textBtn = initialValues ? "Update column" : "Create column";

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialValues) {
        await api.patch(`/column/update/${initialValues?.id}`, values);
      } else if (!initialValues) {
        await api.post(`/column/create/${params?.boardId}`, values);
      }
      setIsOpen(false);
      toast.success(message);
      router.refresh();
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
              <FormLabel>Name column</FormLabel>
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
          {textBtn}
        </Button>
      </form>
    </Form>
  );
};

export default ColumnForm;
