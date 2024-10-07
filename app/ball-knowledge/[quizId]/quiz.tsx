"use client";
import { Button } from "@/components/ui/button";
import { Tables } from "@/database.types";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  questions: (Tables<"question"> & {
    answers: Tables<"answer">[];
  })[];
};

export const Quiz = ({ questions }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [firstQuestion] = questions;

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full p-4 sm:p-8">
      <div className="mb-8 p-4 bg-blue-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl sm:text-3xl font-bold text-black">
          {firstQuestion.text}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {firstQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            className={cn(
              "w-full md:min-h-[120px] p-4 border-4 border-black transition-all",
              "text-left text-lg font-bold",
              selectedAnswer === answer.text
                ? "bg-black text-white shadow-none translate-x-1 translate-y-1"
                : "bg-white text-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
            onClick={() => setSelectedAnswer(answer.text)}
          >
            {answer.text}
          </Button>
        ))}
      </div>
      <Button
        className="mt-8 w-full bg-green-500 text-white text-xl font-bold py-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 transition-all"
        onClick={() => alert(`You selected: ${selectedAnswer}`)}
      >
        Submit Answer
      </Button>
    </div>
  );
};
