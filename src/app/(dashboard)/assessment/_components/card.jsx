import React from "react";

export default function Card() {
  return (
    <div className="border w-72 h-24 rounded bg-gray-50 py-2 px-3">
      <h3 className="font-semibold text-2xl mb-2">JavaScript</h3>
      <span className="flex gap-1 text-sm text-cv-primary/60">
        <p>Progress: </p>
        <p>80%</p>
      </span>
      <span className="text-xs flex gap-2">
        <p className="text-gray-400">Last opened 17 Juli 2025</p>
        <span className="flex gap-1 items-center">
          <div className="bg-yellow-500 w-2 h-2 rounded-full"></div>
          <p className="text-yellow-500">On Going</p>
        </span>
      </span>
    </div>
  );
}
