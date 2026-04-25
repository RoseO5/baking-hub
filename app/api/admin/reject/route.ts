import { supabase } from "@/lib/supabase";

export async function GET() {
  return Response.json({ message: "Reject route is working" });
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const { data, error } = await supabase
      .from("questions")
      .update({ status: "rejected" })
      .eq("id", Number(id))
      .select();

    return Response.json({ data, error });
  } catch (err) {
    return Response.json({ error: "Server crashed", details: err });
  }
}
