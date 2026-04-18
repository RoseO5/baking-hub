import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome to Rosie’s Baking Hub 🍰
      </h1>

      <p className="mt-4">
        Find answers to your baking problems and improve your skills.
      </p>

      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/questions/why-cake-sinks">
            Why does my cake sink?
          </Link>
        </li>

        <li>
          <Link href="/questions/why-puff-puff-hard">
            Why is my puff puff hard?
          </Link>
        </li>

        <li>
          <Link href="/questions/how-to-measure-flour">
            How to measure flour correctly
          </Link>
        </li>
      </ul>
    </main>
  );
}
