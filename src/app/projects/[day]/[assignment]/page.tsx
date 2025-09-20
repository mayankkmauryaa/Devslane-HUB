"use client";
import { useParams } from "next/navigation";

export default function AssignmentPage() {
    const { day, assignment } = useParams();

    return (
        <div className="w-full h-screen">
            <iframe
                src={`/projects/${day}/${assignment}/index.html`}
                className="w-full h-full border-none"
            />
        </div>
    );
}
