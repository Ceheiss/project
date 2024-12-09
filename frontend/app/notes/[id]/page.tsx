"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function NoteDetails({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [note, setNote] = useState<any>(null);
  const url = `http://localhost:5000/notes/${id}`;
  const router = useRouter();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    fetch(url, { credentials: 'include'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setNote(data[0]);
      });
  }, [id]);

  async function handleDelete() {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/notes');
      }
    } catch (err) {
      console.error('Error deleting the note.');
    }
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Note Details</h1>
      <h3>Discipline:</h3>
      <p>{note.discipline}</p>
      <h3>Techniques:</h3>
      <p>{note.techniques}</p>      
      <h3>Feel Scale:</h3>
      <p>{note.feel_rating}</p>
      <h3>Insights:</h3>
      <p>{note.insights}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
