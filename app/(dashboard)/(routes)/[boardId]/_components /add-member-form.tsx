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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

interface AddMemberFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  email: z.string().min(1, { message: "Title is required" }),
  role: z.enum(["VIEWER", "ADMIN"]),
});

const AddMemberForm: FC<AddMemberFormProps> = ({ setIsOpen }) => {
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "VIEWER",
    },
  });

  const textBtn = "Add member";

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post(`/board/${params?.boardId}/member`, values);
      setIsOpen(false);
      toast.success("Member success added");
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email member</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="VIEWER">Viewer</SelectItem>
                </SelectContent>
              </Select>
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

export default AddMemberForm;
