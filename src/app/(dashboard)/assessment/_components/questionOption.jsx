import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function QuestionOption(param) {
  return (
    <div>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">{param.questionDetail.ans1}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">{param.questionDetail.ans2}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-one">{param.questionDetail.ans3}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-four" id="option-four" />
          <Label htmlFor="option-one">{param.questionDetail.ans4}</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
