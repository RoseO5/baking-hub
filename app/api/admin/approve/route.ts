import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { id } = await req.json();

  await supabase
    .from("questions")
    .update({ status: "approved" })
    .eq("id", id);

  return Response.json({ message: "Approved" });
}
