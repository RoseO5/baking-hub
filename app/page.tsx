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
          alert("Form clicked"); // 🔥 STEP 1: confirm click

          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const question = formData.get("question");

          alert("Sending: " + question); // 🔥 STEP 2

          try {
            const res = await fetch("/api/questions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ question }),
            });

            alert("Request sent"); // 🔥 STEP 3

            const result = await res.json();

            alert("Response: " + JSON.stringify(result)); // 🔥 STEP 4

            loadQuestions();
          } catch (err) {
            alert("CRASH: " + err);
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

        <button
          type="submit"
          className="mt-2 bg-black text-white px-4 py-2"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
