import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { id } = await req.json();

  await supabase
    .from("questions")
    .update({ status: "rejected" })
    .eq("id", id);

  return Response.json({ message: "Rejected" });
}
