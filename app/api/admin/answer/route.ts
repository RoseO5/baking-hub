import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { id, answer } = await req.json();

    if (!id || !answer) {
      return Response.json(
        { error: "Missing ID or answer" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("questions")
      .update({ answer })
      .eq("id", Number(id))
      .select();

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    return Response.json(
      { error: "Server crashed", details: err },
      { status: 500 }
    );
  }
}
