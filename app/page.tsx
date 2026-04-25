"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setQuestions(data);
    }
  };

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
          <li key={q.id}>
            <Link href={`/questions/${q.id}`}>
              {q.question}
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

          try {
            const res = await fetch("/api/questions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ question }),
            });

            const result = await res.json();

            if (result.error) {
              alert("Error: " + result.error);
            } else {
              alert("Question submitted!");

              // Optional: refresh approved questions
              loadQuestions();

              // Optional: clear input
              (e.target as HTMLFormElement).reset();
            }
          } catch (err) {
            alert("Something went wrong");
            console.error(err);
          }
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
