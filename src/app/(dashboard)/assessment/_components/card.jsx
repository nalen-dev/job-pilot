import Link from "next/link";
import React from "react";

export default function Card({ name, status, id }) {
  return (
    <Link href={`/assessment/${id}`}>
      <div className="border w-72 h-20 rounded bg-gray-50 py-2 px-3">
        <h3 className="font-semibold text-2xl mb-2">{name}</h3>
        {/* <span className="flex gap-1 text-sm text-cv-primary/60">
          <p>Progress: </p>
          <p>80%</p>
        </span> */}
        <span className="text-xs flex gap-2">
          <p className="text-gray-400">Last opened 20 Juli 2025</p>
          <span className="flex gap-1 items-center">
            <div className="bg-green-500 w-2 h-2 rounded-full"></div>
            <p className="text-green-500">{status}</p>
          </span>
        </span>
      </div>
    </Link>
  );
}
