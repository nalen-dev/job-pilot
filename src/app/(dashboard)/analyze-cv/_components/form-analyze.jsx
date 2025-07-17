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
import { Button } from "@/components/ui/button";
import { analyzeCVAction } from "../action";
import { useActionState } from "react";
import ReactMarkdown from "react-markdown";

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
          <Input
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

      {state?.status === "success" && (
        <section className="mt-10 space-y-6 bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-bold text-cv-primary">
            🤖 AI Summary Result
          </h2>

          <div>
            <p className="text-lg font-medium">Job Title</p>
            <p className=" text-gray-600">{state.message.jobTitle}</p>
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-600 mb-4">Match Score</p>
            <div className="inline-block rounded-full bg-cv-primary/10 p-15 py-15 text-4xl font-bold text-cv-primary">
              {state.message.matchScore}/100
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-2">✅ Matched Skills</p>
              <ul className="bg-green-100 text-green-800 p-4 pl-6 rounded-lg list-disc ml-4 space-y-1">
                {state.message.skillMatch.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">❌ Unmatched Skills</p>
              <ul className="bg-red-100 text-red-800 p-4 pl-6 rounded-lg list-disc ml-4 space-y-1">
                {state.message.skillMismatch.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold mt-6 mb-2">📄 Summary</p>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h3: (props) => (
                    <h3 className="text-lg font-bold mt-6 mb-2" {...props} />
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 space-y-1">{children}</ul>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed">{children}</p>
                  ),
                }}
              >
                {state.message.analysis}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {state?.status === "error" && (
        <p className="bg-red-100 text-red-600 px-3 py-2 mt-6 rounded-md text-sm border border-red-300">
          {state.message}
        </p>
      )}
    </main>
  );
}
