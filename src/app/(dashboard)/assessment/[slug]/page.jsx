import { Button } from "@/components/ui/button";
import React from "react";

export default function Assessment() {
  return (
    <section>
      <section className=" flex flex-col gap-2 text-center mt-64 items-center">
        <h2 className="font-semibold text-xl">JavaScript Assessment</h2>
        <h3>5 Question</h3>
        <Button className="bg-cv-primary hover:bg-cv-primary/80 rounded cursor-pointer w-fit">
          Start Assessment
        </Button>
      </section>
    </section>
  );
}
