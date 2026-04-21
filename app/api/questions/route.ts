import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { question } = body;

  if (!question) {
    return new Response("No question provided", { status: 400 });
  }

  const { error } = await supabase.from("questions").insert([
    { question }
  ]);

  if (error) {
    return new Response("Error saving question", { status: 500 });
  }

  return new Response("Saved successfully", { status: 200 });
}
