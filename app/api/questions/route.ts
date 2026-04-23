import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const { data, error } = await supabase
      .from("questions")
      .insert([{ question }])
      .select();

    return Response.json({ data, error });
  } catch (err) {
    return Response.json({ error: "Server crashed", details: err });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("questions")
    .select("*");

  return Response.json({ data, error });
}
