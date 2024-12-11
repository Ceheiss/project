'use client'
import { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EditNoteData {
  discipline: string,
  techniques: string,
  feel_rating: number,
  insights: string,
}

export default function AddNote() {
  const [formData, setFormData] = useState({
    discipline: '',
    techniques: '',
    feelRating: 0,
    insights: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // Get the ID from the URL
  const { id } = params;
  const url = `http://localhost:5000/notes/${id}`;


  // Handle input changes
  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(url, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch note: ${res.status}`);
        }
        const data = await res.json();
        const normalizeData = (noteData: EditNoteData) => ({
          discipline: noteData.discipline,
          techniques: noteData.techniques,
          feelRating: noteData.feel_rating,
          insights: noteData.insights,
        });        
        setFormData(normalizeData(data[0]));
      } catch (err: any) {
        console.error(err.message);
      }  finally {
        setLoading(false);
      }
    }
    if (id) fetchNote();
  }, [id]);

  const handleSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      discipline: formData.discipline.toLowerCase().trim(),
      techniques: formData.techniques.toLowerCase().trim(),
      feelRating: formData.feelRating,
      insights: formData.insights.trim(),
      id
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error editing the note: ${response.status}`);
      }
      router.push(`/notes/${id}`);
    } catch (error: any) {
      console.error('Error editing the note:', error.message);
    }
  }
  if (loading) return <p>Loading...</p>;
  return <>
    <h1>Edit your log</h1>
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
      <button type="submit">Save Changes</button>
    </form>
  </>
}
