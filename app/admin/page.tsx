import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-red-500 mt-4">Error loading questions</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard 🧑‍🍳</h1>

      <p className="mt-2 text-gray-600">
        All user-submitted baking questions
      </p>

      <div className="mt-6 space-y-4">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <p className="font-semibold">{item.question}</p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
