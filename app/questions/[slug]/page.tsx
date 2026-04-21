import AdBlock from "@/components/AdBlock";
import StudentOffer from "@/components/StudentOffer";
import { questions } from "@/data/questions";

const isStudent = false;
const COURSE_LINK = "https://selar.com/62771693d7";

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const key = params.slug as keyof typeof questions;
  const data = questions[key];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">
        {data?.title || "Baking Question"}
      </h1>

      <p className="mt-4">
        {data?.answer || "Answer coming soon..."}
      </p>

      {/* 💰 COURSE CTA */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="font-bold">
          Want to bake perfectly every time?
        </p>

        <p>
          Get my full baking course here 👉{" "}
          <a
            href={COURSE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline font-semibold"
          >
            Enroll Now
          </a>
        </p>
      </div>

      {isStudent ? <StudentOffer /> : <AdBlock />}
    </main>
  );
}
