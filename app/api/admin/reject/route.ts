import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  return Response.json({ message: "Reject route is working" });
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Missing ID" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("questions")
      .update({ status: "rejected" })
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
