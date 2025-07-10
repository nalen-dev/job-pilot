"use client";

import { Button } from "@/components/ui/button";
import { deleteCvAction } from "../action";
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

export const FormDelete = ({ id, fileName }) => {
  const initialState = { status: "" };
  const [state, action, pending] = useActionState(deleteCvAction, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.status === "success") {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Do you really want to delete this CV?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The selected CV will be permanently
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
            <input type="hidden" name="fileName" value={fileName} readOnly />
            <Button
              disabled={pending}
              className="cursor-pointer"
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
