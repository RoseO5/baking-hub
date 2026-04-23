"use client";

import Link from "next/link";
import { questions } from "@/data/questions";

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
        {Object.keys(questions).map((q) => {
          const key = q as keyof typeof questions;

          return (
            <li key={q}>
              <Link href={`/questions/${q}`}>
                {questions[key].title}
              </Link>
            </li>
          );
        })}
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
            headers: { "Content-Type": "application/json" },
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
