import AdBlock from "@/components/AdBlock";
import StudentOffer from "@/components/StudentOffer";

const isStudent = false;

const questions: Record<string, string> = {
  "why-cake-sinks":
    "Your cake may sink due to too much liquid, underbaking, or opening the oven too early.",
    
  "why-puff-puff-hard":
    "Puff puff becomes hard when there is too much flour or not enough yeast.",
    
  "how-to-measure-flour":
    "Use a measuring cup and level it off. Do not pack the flour."
};

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const answer = questions[params.slug];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold capitalize">
        {params.slug.replace(/-/g, " ")}
      </h1>

      <p className="mt-4">
        {answer || "Answer coming soon..."}
      </p>

      {isStudent ? <StudentOffer /> : <AdBlock />}
    </main>
  );
}
