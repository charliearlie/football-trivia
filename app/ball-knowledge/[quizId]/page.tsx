import { createClient } from "@/utils/supabase/server";
import { Quiz } from "./quiz";

export default async function MultipleChoiceQuizPage() {
  const supabase = createClient();
  const { data: questions, error } = await supabase.from("question").select(`
    id,
    text,
    difficulty,
    createdat,
    updatedat,
    answers:answer (
      id,
      text,
      iscorrect,
      createdat,
      updatedat,
      questionid
    )
  `);

  if (error) {
    return <div>Error loading questions: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-yellow p-4 sm:p-8 flex items-center justify-center">
      {questions ? <Quiz questions={questions} /> : <div>Loading...</div>}
    </div>
  );
}
