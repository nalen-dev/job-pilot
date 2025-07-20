import { openai } from "@/utils/ai";

export async function GenerateQuestionAI(skill,assessmentId) {
    console.log(`Generate question about: ${skill}`)

   const res = await openai.responses.parse({
  model: "gpt-4.1",
  instructions: "You are a teacher. Create 5 multiple choice questions about: " + skill,
  input: skill,
  text: {
    format: {
      type: "json_schema",
      name: "questions",
      schema: {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                options: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 4,
                  maxItems: 4
                },
                correct_answer: { type: "string" }
              },
              required: ["question", "options", "correct_answer"],
              additionalProperties: false 
            },
            minItems: 5,
            maxItems: 5
          }
        },
        required: ["questions"],
        additionalProperties: false 
      }
    }
  }
});

    try {
        const response = await fetch("http://localhost:3001/api/assessment",{
            method: "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: 
            JSON.stringify({
                assessmentId : assessmentId.id,
                questions: res.output_parsed.questions,
            })
        })
    } catch (error) {
        console.log(error)
    }

}