"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Assignment = {
  name: string;
  stack: string[];
  locked?: boolean;
  reason?: string;
};

type Day = {
  num: string;
  assignments: Assignment[];
};

const days: Day[] = [
  {
    num: "D50",
    assignments: [
      { name: "A50.1", stack: ["HTML", "CSS", "JS"] }
    ]
  },
  {
    num: "D51",
    assignments: [
      { name: "A51.1", stack: ["HTML", "CSS",] },
      { name: "A51.2", stack: ["HTML", "CSS",] },
      { name: "A51.3", stack: ["HTML", "CSS",] },
      { name: "A51.4", stack: ["HTML", "CSS",] }
    ]
  },
  {
    num: "D52",
    assignments: [
      { name: "A52.1", stack: ["HTML", "Tailwind"] },
      { name: "A52.2", stack: ["HTML", "Tailwind"] },
      { name: "A52.3", stack: ["HTML", "Tailwind"] },
      { name: "A52.4", stack: ["HTML", "Tailwind"] },
      { name: "A52.5", stack: ["HTML", "Tailwind"] },
      { name: "A52.6", stack: ["HTML", "Tailwind"] }
    ]
  },
  {
    num: "D53",
    assignments: [
      { name: "A53.1", stack: ["HTML", "Tailwind"] },
      { name: "A53.2", stack: ["HTML", "Tailwind"] },
      { name: "A53.3", stack: ["HTML", "Tailwind"] }
    ]
  },
  {
    num: "D54",
    assignments: [
      { name: "A54.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] }
    ]
  },
  {
    num: "D55",
    assignments: [
      { name: "A55.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] },
      { name: "A55.2", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] }
    ]
  },
  {
    num: "D57",
    assignments: [
      { name: "A57.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] }
    ]
  },
  {
    num: "D58",
    assignments: [
      { name: "A58.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"], locked: true, reason: "This assignment is under review. Please check back later. [Router Error]" }
    ]
  },
  {
    num: "D59",
    assignments: [
      {
        name: "A59.1",
        stack: ["HTML", "CSS", "JS", "React", "Tailwind"],
        locked: true,
        reason: "This assignment is under review. Please check back later. [Error 404 redirection issue]"
      }
    ]
  },
  {
    num: "D68",
    assignments: [
      {
        name: "A68.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"],
        locked: true,
        reason: "This assignment is under review. Please check back later. [No rendering]"
      }
    ]
  },
  {
    num: "D71",
    assignments: [
      { name: "A71.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"], locked: true, reason: "This assignment is under review. Please check back later. [Router Error]" }
    ]
  },
  {
    num: "D72",
    assignments: [
      { name: "A72.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] }
    ]
  },
  {
    num: "D74",
    assignments: [
      { name: "A74.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"], locked: true, reason: "This assignment is under review. Please check back later. [No redering]" }
    ]
  },
  {
    num: "D78",
    assignments: [
      { name: "A78.1", stack: ["HTML", "CSS", "JS", "React", "Tailwind"] }
    ]
  },
  {
    num: "D87",
    assignments: [
      { name: "A87.1", stack: ["HTML", "CSS", "JS", "React", "Redux"] }
    ]
  }
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredDays = days
    .map(d => {
      const filteredAssignments = d.assignments.filter(a =>
        d.num.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.stack.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
      );
      return { ...d, assignments: filteredAssignments };
    })

    .filter(d => d.assignments.length > 0);

  return (
    <main className="p-8 md:p-12 lg:p-16">
      <div className="flex items-center justify-center">
        <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Devslane Assignment Hub
        </h1>
      </div>

      {/* Search bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search days, assignments, or tech..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full max-w-md p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Assignment list */}
      <div className="space-y-12">
        {filteredDays.map(d => (
          <section key={d.num}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">{d.num}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {d.assignments.map(a => (
                <div key={a.name} className="relative group">
                  {a.locked ? (
                    // Locked assignment → not clickable
                    <div
                      className="block p-5 text-center font-medium rounded-xl shadow-md
                   bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                      {a.name}
                    </div>
                  ) : (
                    // Unlocked assignment → clickable link
                    <Link
                      href={`/projects/${d.num}/${a.name}`}
                      className="block p-5 text-center font-medium rounded-xl shadow-md
                   bg-amber-300 text-gray-800 hover:bg-amber-400 hover:shadow-lg
                   transition-all duration-200"
                    >
                      {a.name}
                    </Link>
                  )}

                  {/* Tooltip */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-black text-white text-xs rounded
                 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 pointer-events-none z-10"
                  >
                    {a.locked ? a.reason : a.stack.join(", ")}
                  </div>
                </div>
              ))}



            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
