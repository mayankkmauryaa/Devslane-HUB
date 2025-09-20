import Link from "next/link";

const days = [
  { num: "D50", assignments: ["A50.1"] },
  { num: "D51", assignments: ["A51.1", "A51.2", "A51.3", "A51.4"] },
  { num: "D52", assignments: ["A52.1", "A52.2", "A52.3", "A52.4", "A52.5", "A52.6"] },
  { num: "D53", assignments: ["A53.1", "A53.2", "A53.3"] },
  { num: "D54", assignments: ["A54.1"] },
  { num: "D55", assignments: ["A55.1", "A55.2"] },
  { num: "D57", assignments: ["A57.1"] },
  { num: "D58", assignments: ["A58.1"] },
  { num: "D59", assignments: ["A59.1"] },
  { num: "D68", assignments: ["A68.1"] },
  { num: "D71", assignments: ["A71.1"] },
  { num: "D72", assignments: ["A72.1"] },
  { num: "D74", assignments: ["A74.1"] },
  { num: "D78", assignments: ["A78.1"] },
  { num: "D87", assignments: ["A87.1"] },
];

export default function Home() {
  return (
    <main className="p-8 md:p-12 lg:p-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">
        Devslane Assignment Hub
      </h1>

      <div className="space-y-12">
        {days.map((d) => (
          <section key={d.num}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">{d.num}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {d.assignments.map((a) => (
                <Link
                  key={a}
                  href={`/projects/${d.num}/${a}`}
                  className="p-5 text-center font-medium text-gray-800 bg-amber-300 rounded-xl shadow-md hover:bg-amber-400 hover:shadow-lg transition-all duration-200"
                  aria-label={`Go to ${d.num} ${a}`}
                >
                  {a}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
