import { NextRequest, NextResponse } from "next/server";
import { calculateDeterministicScore, EvaluatedResponse } from "@/lib/scoring/engine";
import { INITIAL_COMPETENCIES, SAMPLE_QUESTIONS } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { responses, learner_id = "learner-demo" } = body;

    if (!Array.isArray(responses)) {
      return NextResponse.json(
        { success: false, error: "responses array required" },
        { status: 400 }
      );
    }

    const evaluated: EvaluatedResponse[] = responses.map((r: any) => {
      const q = SAMPLE_QUESTIONS.find((item) => item.id === r.question_id) || SAMPLE_QUESTIONS[0];
      const opt = q.options?.find((o) => o.id === r.selected_option_id);
      return {
        question: q,
        selectedOptionId: r.selected_option_id,
        isCorrect: opt?.is_correct || false,
        timeTakenSeconds: r.time_taken_seconds || 15,
      };
    });

    const targetCompetencies = INITIAL_COMPETENCIES.map((c) => ({
      competencyId: c.id,
      targetLevel: 4,
    }));

    const result = calculateDeterministicScore(evaluated, targetCompetencies, {}, learner_id);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Scoring evaluation failed" },
      { status: 500 }
    );
  }
}
