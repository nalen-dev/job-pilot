import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      id,
      jobTitle,
      matchScore,
      skillMatch,
      skillMismatch,
      summarizeDetail,
    } = data;

    const updated = await prisma.aiSummarization.update({
      where: { id },
      data: {
        jobTitle,
        matchScore,
        skillMatch,
        skillMismatch,
        summarizeDetail,
        status: "completed",
      },
    });
    return NextResponse.json({ status: "success", updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error", message: "Failed to update summary" }, { status: 500 });
  }
}