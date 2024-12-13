"use client";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import "./add.css";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AddNote() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    discipline: "",
    techniques: "",
    feelRating: 0,
    insights: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      discipline: formData.discipline.toLowerCase().trim(),
      techniques: formData.techniques.toLowerCase().trim(),
      feelRating: Number(formData.feelRating) - 1,
      insights: formData.insights.trim(),
    };

    try {
      const response = await fetch(`${baseURL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      router.push("/notes");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div id="create">
      <h1>Log your training!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="discipline">
            What did you train (keep name consistent for better metrics):{" "}
          </label>
          <input
            name="discipline"
            onChange={handleChange}
            value={formData.discipline}
            placeholder="Discipline"
          />
        </div>
        <div className="form-section">
          <label htmlFor="techniques">
            Enter the techniques your learned or practiced separated by a comma:{" "}
          </label>
          <input
            name="techniques"
            onChange={handleChange}
            value={formData.techniques}
            placeholder="Techniques"
          />
        </div>
        <div className="form-section">
          <label htmlFor="feelRating">
            How did you feel this session on a scale 1 to 5? (5 is great):{" "}
          </label>
          <input
            name="feelRating"
            onChange={handleChange}
            value={formData.feelRating}
            placeholder="1"
            type="number"
            min="1"
            max="5"
          />
        </div>
        <div className="form-section">
          <label htmlFor="insights">
            Insights, some narration of what the session was about. Here you can
            explain a bit more:{" "}
          </label>
          <textarea
            name="insights"
            onChange={handleChange}
            value={formData.insights}
            placeholder="Insights"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
