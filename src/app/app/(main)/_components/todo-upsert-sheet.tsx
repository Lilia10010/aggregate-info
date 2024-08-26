"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "../types";
import { toast } from "@/components/ui/use-toast";
import { upsertTodo } from "../actions";
import { upsertTodoSchema } from "../schema";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

type TodoUpsertSheetProps = {
  children?: React.ReactNode;
  defaultValue?: Todo;
};

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertTodoSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    await upsertTodo(data);

    router.refresh();

    /* ref.current?.click(); */

    toast({
      title: "Success",
      description: "Your todo has been updated successfully.",
    });
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between space-y-8 h-screen"
          >
            <div>
              <SheetHeader>
                <SheetTitle>Upsert Todo</SheetTitle>
                <SheetDescription>
                  Add or edit your todo item here. Click save when you re done.
                </SheetDescription>
              </SheetHeader>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your todo title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be the publicly displayed name for the task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="mt-auto pb-8">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
