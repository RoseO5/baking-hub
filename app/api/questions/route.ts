export async function POST(req: Request) {
  const body = await req.json();

  console.log("New Question:", body);

  return new Response(
    JSON.stringify({ message: "Question received" }),
    { status: 200 }
  );
}
