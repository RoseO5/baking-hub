"use client";

import Link from "next/link";

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
        <li><Link href="/questions/why-cake-sinks">Why does my cake sink?</Link></li>
        <li><Link href="/questions/why-puff-puff-hard">Why is my puff puff hard?</Link></li>
        <li><Link href="/questions/why-cake-not-rising">Why is my cake not rising?</Link></li>
        <li><Link href="/questions/why-cake-dry">Why is my cake dry?</Link></li>
        <li><Link href="/questions/how-to-measure-flour">How to measure flour</Link></li>
      </ul>

      {/* 👇 FORM */}
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
