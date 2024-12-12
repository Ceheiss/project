'use client'
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import './add.css';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AddNote() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    discipline: '',
    techniques: '',
    feelRating: 0,
    insights: '',
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      discipline: formData.discipline.toLowerCase().trim(),
      techniques: formData.techniques.toLowerCase().trim(),
      feelRating: Number(formData.feelRating),
      insights: formData.insights.trim(),
    }

    try {
      const response = await fetch(`${baseURL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      router.push("/notes");
    } catch (error: any) {
      console.error('Error submitting the form:', error.message);
    }
  }

  return <>
    <h1>Log your training!</h1>
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <input name="discipline" onChange={handleChange} value={formData.discipline} placeholder="Discipline"/>
      </div>
      <div>
        <input name="techniques" onChange={handleChange} value={formData.techniques} placeholder="Techniques"/>
      </div>
      <div>
      <input name="feelRating" onChange={handleChange} value={formData.feelRating} placeholder="0" type="number" min="0" max="4"/>
      </div>
      <div>
        <textarea name="insights" onChange={handleChange} value={formData.insights} placeholder="Insights"/>
      </div>  
      <button type="submit">Add</button>
    </form>
  </>
}
