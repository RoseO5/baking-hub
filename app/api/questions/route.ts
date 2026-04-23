import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { question } = await req.json();

  const { data, error } = await supabase
    .from("questions")
    .insert([{ question }])
    .select();

  console.log("INSERT RESULT:", { data, error });

  if (error) {
    return Response.json({ success: false, error: error.message });
  }

  return Response.json({ success: true, data });
}

export async function GET() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("FETCH RESULT:", { data, error });

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json(data);
}
