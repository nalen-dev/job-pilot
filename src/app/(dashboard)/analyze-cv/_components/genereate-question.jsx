"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { GenerateQuestionAction } from "../action";

export const GenerateQuestion = ({ id, title }) => {
  const initialState = { status: "", message: "" };
  const [state, action, pending] = useActionState(
    GenerateQuestionAction,
    initialState
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <li className="cursor-pointer w-full bg-transparent text-red-800 border-0 hover:text-red-500">
          {title}
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Create assessment for {title}
          </DialogTitle>
          <DialogDescription>
            This action will generate assessment to enhance your skill on{" "}
            {title}, you sure you want to generete the test?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="my-4">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <input type="hidden" name="skill" value={title} readOnly />
            <input type="hidden" name="id" value={id} readOnly />
            <Button
              disabled={pending}
              className="cursor-pointer w-full bg-cv-primary hover:bg-cv-primary/50"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
