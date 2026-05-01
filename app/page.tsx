"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<any>({});
  const [adsCount, setAdsCount] = useState(0);

  // NEW (safe UI feedback)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      setMessage("🎬 Quick step before unlocking… you’re doing great!");

      setTimeout(() => {
        setUnlocked((prev: any) => ({ ...prev, [id]: true }));
        setAdsCount((prev) => prev + 1);
        setMessage("🎉 Answer unlocked — keep learning!");
      }, 1500);
    } else {
      setUnlocked((prev: any) => ({ ...prev, [id]: true }));
      setMessage("🎉 Answer unlocked");
    }
  };

  const isStudent = false;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome to Rosie’s Baking Hub 🍰
      </h1>

      {/* 🔔 GLOBAL MESSAGE */}
      {message && (
        <p className="mt-3 text-green-600 text-sm">{message}</p>
      )}

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
                  <>
                    <p className="mt-2">{q.answer}</p>
                    <p className="text-xs text-purple-600 mt-2">
                      💡 This is how real bakers improve step by step
                    </p>
                  </>
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
                        className="mt-2 bg-black text-white px-3 py-1 rounded"
                      >
                        🎉 Unlock Answer — You are learning like a pro
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {/* CTA */}
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

      {/* FORM */}
      <form
        className="mt-10"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const question = formData.get("question");

          try {
            setLoading(true);
            setMessage("Submitting your question...");

            const res = await fetch("/api/questions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ question }),
            });

            const result = await res.json();

            if (result.error) {
              setMessage("❌ Failed to submit. Try again.");
            } else {
              setMessage("✅ Question submitted successfully!");
              loadQuestions();
            }
          } catch (err) {
            console.error(err);
            setMessage("❌ Something went wrong.");
          } finally {
            setLoading(false);
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
          disabled={loading}
          className="mt-2 bg-black text-white px-4 py-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* BOTTOM CTA */}
      <div className="mt-12 text-center">
        <p className="text-lg font-semibold">
          Ready to stop guessing and start baking confidently?
        </p>

        <a
          href="https://selar.com/62771693d7?source=app_bottom"
          target="_blank"
          className="inline-block mt-3 bg-black text-white px-6 py-3 rounded"
        >
          🍰 Get Full Baking Course
        </a>

        <p className="text-xs text-gray-500 mt-2">
          ⭐ Loved by beginners learning from scratch
        </p>

        <a
          href="https://wa.me/2348142750728?text=Hi%20I%20want%20to%20learn%20cake%20baking%20step%20by%20step%20and%20I%20am%20interested%20in%20your%20course"
          target="_blank"
          className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          💬 Talk to me on WhatsApp
        </a>
      </div>
    </main>
  );
}
