"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from "@/app/components/Spinner";

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
    return <Spinner />;
  }

  return (
    <section className='page-container'>
      <h1>Note Details</h1>
      <h3>Discipline:</h3>
      <p>{note.discipline}</p>
      <h3>Techniques:</h3>
      <p>{note.techniques}</p>      
      <h3>Feel Scale:</h3>
      <p>{note.feel_rating}</p>
      <h3>Insights:</h3>
      <p>{note.insights}</p>
      <button id="delete-button" onClick={handleDelete}>Delete</button>
      <Link id="edit-link" href={`/notes/${id}/edit`}>Edit</Link>
    </section>
  );
}
