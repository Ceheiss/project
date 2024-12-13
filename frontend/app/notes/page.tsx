'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './notes.css';
import Spinner from '../components/spinner/Spinner';

interface Note {
  id: number;
  discipline: string;
  techniques: string;
  feel_rating: number;
  insights: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Notes() {
  const url = `${baseURL}/notes`;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url, { credentials: 'include'});
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes data:', error);
      }
    }
    fetchInfo();
  }, [url]);

  if (!notes) {
    return <Spinner />;
  }

  return <>
    <header>
      <h1>Notes</h1>
      <h3><Link href='notes/add'>Create a <span>new note!</span></Link></h3>
    </header>
    <section className="cards">
      {notes.map((note: Note) => (
          <div className="card"
              key={note.id}>
            <h3>Discipline:</h3>
            <p>{note.discipline}</p>
            <h3>Techniques:</h3>
            <p>{note.techniques}</p>      
            <h3>Feel Scale:</h3>
            <p>{note.feel_rating + 1}</p>
            <h3>Insights:</h3>
            <p id="insights">{note.insights}</p>
            <Link href={`/notes/${note.id}`}>Details</Link>
          </div> 
      ))}
    </section>
  </>;
}
