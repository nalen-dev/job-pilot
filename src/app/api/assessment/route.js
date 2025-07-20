import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
   
    if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
    }

    const data = await req.json()
    
    try {
        const createdQuestions = await Promise.all(
            data.questions.map(questionData =>
                prisma.assessmentQuestion.create({
                    data : {
                        ugsId:data.assessmentId,
                        question: questionData.question,
                        ans1: questionData.options[0],
                        ans2: questionData.options[1],
                        ans3: questionData.options[2],
                        ans4: questionData.options[3],
                        ansRight:questionData.correct_answer
                    }
                })
            )
        )

        return NextResponse.json({ success: true, count: createdQuestions.length });
    } catch (error) {
        console.error('Error seeding questions:', error);
        return NextResponse.json({ success: false, error: 'Failed to seed questions' }, {status:500});
    }
}