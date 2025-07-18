"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { analyzeCVAction } from "../action";
import { useActionState } from "react";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";

export function FormAnalyze({ files }) {
  const initialState = { status: "", message: "" };
  const [state, action, pending] = useActionState(
    analyzeCVAction,
    initialState
  );

  return (
    <main className="max-w-3xl mx-auto my-12 px-4">
      <form
        action={action}
        className="space-y-6 bg-white border rounded-xl p-6 shadow-md"
      >
        <div className="space-y-2">
          <Label className="text-sm text-gray-700 font-medium">
            Job Description
          </Label>
          <Textarea
            required
            name="jobDesc"
            placeholder="Describe the job role and required skills..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-700 font-medium">
            Select a CV to Analyze
          </Label>
          <Select name="selectedFile" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a CV file..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Uploaded Files</SelectLabel>
                {files.map((file) => (
                  <SelectItem
                    key={file.id}
                    value={JSON.stringify({
                      fileId: file.id,
                      fileUrl: file.previewUrl,
                    })}
                  >
                    {file.fileName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          disabled={pending}
          type="submit"
          className="w-full bg-cv-primary hover:bg-cv-primary/90 text-white font-semibold cursor-pointer"
        >
          {pending ? "Analyzing..." : "Analyze CV"}
        </Button>
      </form>
    </main>
  );
}
