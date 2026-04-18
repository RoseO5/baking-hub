import AdBlock from "@/components/AdBlock";
import StudentOffer from "@/components/StudentOffer";

const isStudent = false;

type Props = {
  params: { slug: string };
};

export default function QuestionPage({ params }: Props) {
  const { slug } = params;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      <p className="mt-4">
        This is where your baking answer will go.
      </p>

      {isStudent ? <StudentOffer /> : <AdBlock />}
    </main>
  );
}
