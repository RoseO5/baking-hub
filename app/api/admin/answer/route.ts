import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { id, answer } = await req.json();

  const { data, error } = await supabase
    .from("questions")
    .update({ answer })
    .eq("id", Number(id))
    .select();

  return Response.json({ data, error });
}
