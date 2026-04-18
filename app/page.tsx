"use client";

import Link from "next/link";

const questions = [
  "why-cake-sinks",
  "why-cake-not-rising",
  "why-cake-dry",
  "why-cake-dense",
  "why-cake-cracks",
  "why-cake-sticky",
  "why-cake-flat",
  "why-cake-burns",
  "why-cake-undercooked",
  "why-cake-collapses",

  "why-puff-puff-hard",
  "why-puff-puff-oily",
  "why-puff-puff-flat",
  "why-puff-puff-burns",
  "why-puff-puff-not-rising",

  "how-to-measure-flour",
  "how-to-preheat-oven",
  "how-to-mix-batter",
  "how-to-check-cake-done",
  "how-to-store-cake",

  "why-bread-dense",
  "why-bread-hard",
  "why-bread-not-rising",

  "why-cookies-hard",
  "why-cookies-soft",

  "why-icing-runny",
  "why-icing-hard",

  "why-cake-sticks-pan",
  "how-to-grease-pan",

  "why-cake-bitter",
  "why-cake-too-sweet",

  "why-cake-heavy",
  "why-cake-light",

  "why-cake-wet",
  "why-cake-dry-edges",

  "why-butter-not-creaming",
  "why-eggs-curdle",

  "why-mixture-lumpy",
  "why-mixture-thin",

  "why-cake-smells-egg",
  "why-cake-no-flavor",

  "why-oven-not-heating",
  "why-cake-rises-one-side",
  "why-batter-curdled"
];

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome to Rosie’s Baking Hub 🍰
      </h1>

      <p className="mt-4">
        Find answers to your baking problems and improve your skills.
      </p>

      <ul className="mt-6 space-y-2">
        {questions.map((q) => (
          <li key={q}>
            <Link href={`/questions/${q}`}>
              {q.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>

      {/* FORM */}
      <form
        className="mt-10"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const question = formData.get("question");

          await fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify({ question }),
          });

          alert("Question submitted!");
        }}
      >
        <h2 className="font-bold mb-2">Ask a Baking Question</h2>

        <input
          name="question"
          placeholder="Type your question..."
          className="border p-2 w-full"
        />

        <button className="mt-2 bg-black text-white px-4 py-2">
          Submit
        </button>
      </form>
    </main>
  );
}
