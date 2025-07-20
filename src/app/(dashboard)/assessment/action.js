"use server"

import { getCurrentSession } from "@/services/auth";
import { GenerateQuestionAI } from "@/trigger/generate-question";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function GetUserAssesments(params) {
    const session = await getCurrentSession();
    if(!session){
        return {
            status: 'error',
            message: 'Unauthorized'
        }
    }

  const summaries = await prisma.aiSummarization.findMany({
  where: {
    userId: session.user.id
  },
  include: {
    userGapSkill: true 
  },
  orderBy: {
    jobTitle: 'asc' 
  }
});

if (summaries.length == 0 ){
    return []
}

const groupedByJobTitle = summaries.reduce((acc, summarization) => {
  const jobTitle = summarization.jobTitle || 'Unknown';
  
  if (!acc[jobTitle]) {
    acc[jobTitle] = [];
  }
  
  if (summarization.userGapSkill) {
    acc[jobTitle].push(...summarization.userGapSkill);
  }
  
  return acc;
}, {});

return Object.entries(groupedByJobTitle).map(([jobTitle, skills]) => {
  return {
    jobTitle,
    skills: skills.map(skill => ({
      id: skill.id,
      name: skill.skill, 
      status: skill.status
    })),
    totalSkills: skills.length
  };
});

}