import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from("questions")
    .update({ status: "rejected" })
    .eq("id", id)
    .select();

  return Response.json({ data, error });
}
