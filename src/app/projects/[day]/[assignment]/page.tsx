"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";

export default function AssignmentPage() {
    const { day, assignment } = useParams();

    // --- Notes / Annotations ---
    const notesKey = `notes-${day}-${assignment}`;
    const [notes, setNotes] = useState("");
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(notesKey);
        if (saved) setNotes(saved);
    }, [notesKey]);

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        localStorage.setItem(notesKey, e.target.value);
    };

    // --- Bookmarks / Favorites ---
    const bookmarkKey = "bookmarkedAssignments";
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem(bookmarkKey) || "[]");
        setBookmarked(bookmarks.some((b: { day: ParamValue; assignment: ParamValue; }) => b.day === day && b.assignment === assignment));
    }, [day, assignment]);

    const toggleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem(bookmarkKey) || "[]");
        let updated;
        if (bookmarked) {
            updated = bookmarks.filter((b: { day: ParamValue; assignment: ParamValue; }) => !(b.day === day && b.assignment === assignment));
        } else {
            updated = [...bookmarks, { day, assignment }];
        }
        localStorage.setItem(bookmarkKey, JSON.stringify(updated));
        setBookmarked(!bookmarked);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Sticky Breadcrumb Header */}
            <nav className="sticky top-0 z-50 p-4 bg-gray-100 text-gray-700 text-sm flex items-center justify-between shadow">
                <div className="flex gap-2 items-center">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>&gt;</span>
                    <Link href={`/projects/${day}`} className="hover:underline">{day}</Link>
                    <span>&gt;</span>
                    <span>{assignment}</span>
                </div>

                {/* Bookmark & Toggle Notes Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={toggleBookmark}
                        className={`px-3 py-1 rounded font-medium ${
                            bookmarked ? "bg-yellow-400" : "bg-gray-300"
                        } hover:brightness-90 transition`}
                    >
                        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                    </button>

                    <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="px-3 py-1 rounded bg-green-500 text-white hover:bg-blue-600 transition"
                    >
                        {showNotes ? "Hide Notes" : "Take Notes"}
                    </button>
                </div>
            </nav>

            {/* Assignment iframe */}
            <iframe
                src={`/projects/${day}/${assignment}/index.html`}
                className="flex-1 w-full border-none"
                title={`${day} ${assignment}`}
            />

            {/* Notes Section */}
            {showNotes && (
                <div className="p-4 bg-gray-100">
                    <h2 className="font-semibold mb-2">Your Notes</h2>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Write your notes here..."
                        className="w-full p-3 border rounded-md resize-none h-32"
                    />
                </div>
            )}
        </div>
    );
}
