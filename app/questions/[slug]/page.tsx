import AdBlock from "@/components/AdBlock";
import StudentOffer from "@/components/StudentOffer";
import { questions } from "@/data/questions";

const isStudent = false;

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const data = questions[params.slug];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">
        {data?.title || "Baking Question"}
      </h1>

      <p className="mt-4">
        {data?.answer || "Answer coming soon..."}
      </p>

      {/* 💰 COURSE CTA */}
      <div className="mt-6 p-4 bg-green-100 rounded">
        <p className="font-bold">
          Want to bake perfectly every time?
        </p>
        <p>
          Get my full baking course here 👉 [YOUR COURSE LINK]
        </p>
      </div>

      {isStudent ? <StudentOffer /> : <AdBlock />}
    </main>
  );
}
