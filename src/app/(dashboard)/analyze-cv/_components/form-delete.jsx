"use client"
import { Button } from "@/components/ui/button";
import { deleteSummaryAction } from "../action";
import { Trash2 } from "lucide-react";
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

export const FormDelete = ({ id, objectKey }) => {
  const initialState = { status: "", message: "" };
  const [state, action, pending] = useActionState(deleteSummaryAction, initialState);
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
        <Button
          className="cursor-pointer hover:bg-red-700"
          variant="destructive"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Do you really want to delete this analysis?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The selected analysis will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="my-4">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <input type="hidden" name="id" value={id} readOnly />
            <Button
              disabled={pending}
              className="cursor-pointer w-full hover:bg-red-700"
              type="submit"
              variant="destructive"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

