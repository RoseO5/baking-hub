import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const { data, error } = await supabase
      .from("questions")
      .insert([{ question, status: "pending" }])
      .select();

    return Response.json({ data, error });
  } catch (err) {
    return Response.json({ error: "Server crashed", details: err });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return Response.json({ data, error });
}
