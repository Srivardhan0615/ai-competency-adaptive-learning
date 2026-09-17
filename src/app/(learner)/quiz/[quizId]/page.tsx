import React from "react";
import QuizRunner from "@/components/quiz/QuizRunner";
import { SAMPLE_QUESTIONS, INITIAL_COURSES } from "@/lib/mock-data";

interface QuizPageProps {
  params: {
    quizId: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const course = INITIAL_COURSES.find((c) => c.id === params.quizId) || INITIAL_COURSES[0];

  return (
    <div className="py-4">
      <QuizRunner
        quizTitle={`${course.title} - Adaptive Diagnostic`}
        courseId={course.id}
        questions={SAMPLE_QUESTIONS}
      />
    </div>
  );
}
