import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { question } = await req.json();

  const { error } = await supabase
    .from("questions")
    .insert([{ question }]);

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json({ message: "Saved to database" });
}

export async function GET() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json(data);
}
