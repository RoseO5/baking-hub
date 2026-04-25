"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      loadQuestions();
    }
  }, []);

  const loadQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setQuestions(data);
    }
  };

  // ✅ APPROVE WITH DEBUG + SAFE UPDATE
  const approve = async (id: number) => {
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id) }), // ensure correct type
      });

      const result = await res.json();
      alert(JSON.stringify(result));

      await loadQuestions();
    } catch (err) {
      alert("Approve failed");
      console.error(err);
    }
  };

  // ❌ REJECT WITH DEBUG + SAFE UPDATE
  const reject = async (id: number) => {
    try {
      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id) }),
      });

      const result = await res.json();
      alert(JSON.stringify(result));

      await loadQuestions();
    } catch (err) {
      alert("Reject failed");
      console.error(err);
    }
  };

  if (!authorized) {
    return <p className="p-6">Checking access...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard 🧑‍🍳</h1>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          router.push("/admin/login");
        }}
        className="mt-2 text-sm underline"
      >
        Logout
      </button>

      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded">
            <p className="font-medium">{q.question}</p>

            <p className="text-xs text-gray-500">
              {new Date(q.created_at).toLocaleString()}
            </p>

            <p className="text-sm mt-1">
              Status: <span className="font-bold">{q.status}</span>
            </p>

            <div className="mt-3 space-x-2">
              <button
                onClick={() => approve(q.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => reject(q.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
