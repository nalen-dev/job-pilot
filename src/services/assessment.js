import { prisma } from "@/utils/prisma";

export async function GetAssementInformation(id) {
    
    const questionTitle = await prisma.userGapSkill.findFirst({
        where: {
            id:id
        },
        select:
        {
            skill:true
        }
    })
    
    const questions = await prisma.assessmentQuestion.findFirst({
                            where: { 
                                ugsId : id 
                            }
                        })
    
    return {questionTitle:questionTitle.skill , questions};
}

export async function GetAllAssesmentIds(id) {
    const questions = await prisma.assessmentQuestion.findMany({
        where: {
            ugsId:id
        },
        select : {
            id:true
        }
    })

    return questions;
}

export async function GetQuestionDetail(id) {
    const question = await prisma.assessmentQuestion.findFirst({
        where:{
            id:id
        }
    })

    return question;
}