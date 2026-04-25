"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

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

  const approve = async (id: number) => {
    try {
      setLoadingId(id);

      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (result.error) {
        alert("Error: " + result.error);
      } else {
        alert("Approved successfully ✅");
      }

      loadQuestions();
    } catch (err) {
      alert("Approve failed ❌");
    } finally {
      setLoadingId(null);
    }
  };

  const reject = async (id: number) => {
    try {
      setLoadingId(id);

      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (result.error) {
        alert("Error: " + result.error);
      } else {
        alert("Rejected successfully ❌");
      }

      loadQuestions();
    } catch (err) {
      alert("Reject failed ❌");
    } finally {
      setLoadingId(null);
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
                disabled={loadingId === q.id}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {loadingId === q.id ? "Processing..." : "Approve"}
              </button>

              <button
                onClick={() => reject(q.id)}
                disabled={loadingId === q.id}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                {loadingId === q.id ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
