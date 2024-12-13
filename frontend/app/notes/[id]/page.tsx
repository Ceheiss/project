"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner/Spinner";
import "./details.css";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function NoteDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [note, setNote] = useState({
    discipline: "",
    techniques: "",
    feel_rating: 0,
    insights: "",
  });
  const url = `${baseURL}/notes/${id}`;
  const router = useRouter();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (id) {
          const response = await fetch(url, { credentials: "include" });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setNote(data[0]);
        }
      } catch (error) {
        console.error("Error fetching the notes data:", error);
      }
    };
    fetchInfo();
  }, [id, url]);

  async function handleDelete() {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      router.push("/notes");
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  }

  if (!note) {
    return <Spinner />;
  }

  return (
    <section className="page-container">
      <h1>Note Details</h1>
      <h3>Discipline:</h3>
      <p>{note.discipline}</p>
      <h3>Techniques:</h3>
      <p>{note.techniques}</p>
      <h3>Feel Scale:</h3>
      <p>{note.feel_rating + 1}</p>
      <h3>Insights:</h3>
      <p id="insights-extended">{note.insights}</p>
      <button id="delete-button" onClick={handleDelete}>
        Delete
      </button>
      <Link id="edit-link" href={`/notes/${id}/edit`}>
        Edit
      </Link>
    </section>
  );
}
