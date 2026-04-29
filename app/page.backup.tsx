"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<any>({});
  const [adsCount, setAdsCount] = useState(0);

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

  const unlockAnswer = (id: number) => {
    if (adsCount < 3) {
      alert("Watch ad to unlock answer 🎥");

      setTimeout(() => {
        setUnlocked((prev: any) => ({ ...prev, [id]: true }));
        setAdsCount((prev) => prev + 1);
        alert("Answer unlocked ✅");
      }, 1500);
    } else {
      setUnlocked((prev: any) => ({ ...prev, [id]: true }));
    }
  };

  const isStudent = false;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome to Rosie’s Baking Hub 🍰
      </h1>

      {/* QUESTIONS WITH ANSWERS */}
      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded">
            <p className="font-bold">{q.question}</p>

            {/* STUDENT */}
            {isStudent && (
              <p className="mt-2">{q.answer}</p>
            )}

            {/* FREE USER */}
            {!isStudent && (
              <>
                {unlocked[q.id] ? (
                  <p className="mt-2">{q.answer}</p>
                ) : (
                  <>
                    <p className="mt-2 text-gray-500">
                      {q.answer
                        ? q.answer.slice(0, 60) + "..."
                        : "No answer yet"}
                    </p>

                    {q.answer && (
                      <button
                        onClick={() => unlockAnswer(q.id)}
                        className="mt-2 bg-black text-white px-3 py-1"
                      >
                        Unlock Answer
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {/* 🔥 HIGH-CONVERTING CTA */}
            {(isStudent || unlocked[q.id]) && (
              <a
                href="https://selar.com/62771693d7?source=app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                🔥 Get My Complete Baking Course (Step-by-Step)
              </a>
            )}
          </div>
        ))}
      </div>

      {/* FORM (UNCHANGED + DEBUG SAFE) */}
      <form
        className="mt-10"
        onSubmit={async (e) => {
          alert("Form clicked");

          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const question = formData.get("question");

          alert("Sending: " + question);

          try {
            const res = await fetch("/api/questions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ question }),
            });

            alert("Request sent");

            const result = await res.json();

            alert("Response: " + JSON.stringify(result));

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
