"use client";

import { useActionState, useEffect, useState } from "react";
import { UploadCloud, Plus } from "lucide-react";
import uploadCvAction from "../action";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function FormUpload() {
  const initialState = { status: "", message: "" };
  const [state, action, pending] = useActionState(uploadCvAction, initialState);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      setOpen(false);
      setErrorMessage("");
      setFile(null);
    }
  }, [state]);

  useEffect(() => {
    if (!open) {
      setErrorMessage("");
      setFile(null);
    }
  }, [open]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size > 5 * 1024 * 1024) {
      setErrorMessage("File too large. Max file size is 5 MB.");
      setFile(null);
    } else {
      setErrorMessage("");
      setFile(selected);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cv-primary text-white hover:bg-cv-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Upload New CV
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg border shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-cv-primary text-xl font-semibold">
            <UploadCloud className="w-5 h-5" />
            Upload New CV
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mb-6">
            Choose a PDF CV file to upload.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 px-3 py-2 mb-3 rounded-md text-sm border border-red-300">
            {errorMessage}
          </div>
        )}

        <form
          action={action}
          className="space-y-4"
          onSubmit={(e) => {
            if (errorMessage || !file) {
              e.preventDefault();
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="file">Select PDF CV File</Label>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 5 MB
            </p>
            <Input
              id="file"
              type="file"
              name="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="file:text-cv-primary file:font-medium file:rounded-md file:border-1 file:bg-cv-primary/10 hover:file:bg-cv-primary/20"
            />
          </div>

          <Button
            type="submit"
            className="bg-cv-primary hover:bg-cv-primary/90 transition-all duration-200 shadow-sm text-white font-medium w-full"
            disabled={pending}
          >
            {pending ? "Uploading..." : "Upload CV"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
