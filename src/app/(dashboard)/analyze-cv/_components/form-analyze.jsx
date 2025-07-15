"use client";
import { Input } from "@/components/ui/input";
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
import { analyzeCVAction } from "../action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import ReactMarkdown from "react-markdown";

export function FormAnalyze({ files }) {
  const [state, action, pending] = useActionState(analyzeCVAction, null);
  return (
    <main className="max-w-2xl m-auto my-12">
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label>Insert Job Description</Label>
          <Input name="jobDesc" />
        </div>
        <div className="space-y-2">
          <Label>Choose the CV you want to analyze</Label>
          <Select name="selectedFile">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a CV" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
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
        <Button disabled={pending} type="submit" className="cursor-pointer">
          {pending ? "Analyzing..." : "Analyze CV"}
        </Button>
      </form>
      {state?.success && (
        <section className="mt-8 p-4 border rounded shadow bg-white space-y-4">
          <h2 className="text-xl font-bold">AI Summary Result</h2>

          <div>
            <strong>Job Title:</strong> {state.data.jobTitle}
          </div>

          <div>
            <strong>Match Score:</strong> {state.data.matchScore}%
          </div>

          <div>
            <strong>Matched Skills:</strong>
            <ul className="list-disc ml-6">
              {state.data.skillMatch.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Unmatched Skills:</strong>
            <ul className="list-disc ml-6">
              {state.data.skillMismatch.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Summary:</strong>
            <ReactMarkdown>{state.data.analysis}</ReactMarkdown>
          </div>
        </section>
      )}
    </main>
  );
}
