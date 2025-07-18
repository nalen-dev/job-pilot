"use client";
import ReactMarkdown from "react-markdown";

export default function MarkdownPage({ summarizeDetail }) {
  return (
    <div>
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
        {summarizeDetail}
      </ReactMarkdown>
    </div>
  );
}
