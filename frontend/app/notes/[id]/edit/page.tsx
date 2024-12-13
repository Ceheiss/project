"use client";
import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/app/components/spinner/Spinner";

interface EditNoteData {
  discipline: string;
  techniques: string;
  feel_rating: number;
  insights: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AddNote() {
  const [formData, setFormData] = useState({
    discipline: "",
    techniques: "",
    feelRating: 0,
    insights: "",
  });
  const router = useRouter();
  const params = useParams(); // Get the ID from the URL
  const { id } = params;
  const url = `${baseURL}/notes/${id}`;

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch note: ${response.status}`);
        }
        const data = await response.json();
        const normalizeData = (noteData: EditNoteData) => ({
          discipline: noteData.discipline,
          techniques: noteData.techniques,
          feelRating: Number(noteData.feel_rating) + 1,
          insights: noteData.insights,
        });
        setFormData(normalizeData(data[0]));
      } catch (error) {
        console.error(error);
      }
    }
    if (id) fetchNote();
  }, [id, url]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      discipline: formData.discipline.toLowerCase().trim(),
      techniques: formData.techniques.toLowerCase().trim(),
      feelRating: Number(formData.feelRating - 1),
      insights: formData.insights.trim(),
      id,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error editing the note: ${response.status}`);
      }
      router.push(`/notes/${id}`);
    } catch (error) {
      console.error("Error editing the note:", error);
    }
  };

  if (!formData) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Edit your log</h1>
      <form className="form" onSubmit={handleSubmit}>
        <section className="form-section">
          <input
            required
            name="discipline"
            onChange={handleChange}
            value={formData.discipline}
            placeholder="Discipline"
          />
        </section>
        <section className="form-section">
          <input
            required
            name="techniques"
            onChange={handleChange}
            value={formData.techniques}
            placeholder="Techniques"
          />
        </section>
        <section className="form-section">
          <input
            required
            name="feelRating"
            onChange={handleChange}
            value={formData.feelRating}
            placeholder="1"
            type="number"
            min="1"
            max="5"
          />
        </section>
        <section className="form-section">
          <textarea
            required
            name="insights"
            onChange={handleChange}
            value={formData.insights}
            placeholder="Insights"
          />
        </section>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}
