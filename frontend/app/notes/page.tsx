'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './notes.css';

export default function Notes() {
  const url = "http://localhost:5000/notes";

  const [notes, setNotes] = useState([]);

  const fetchInfo = () => {
    return fetch(url, { credentials: 'include'})
      .then((res) => res.json())
      .then((d) => setNotes(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return <>
    <h1>Notes</h1>
    <div className="cards">
      {notes.map((note, i) => (
          <div className="card"
              key={note.id}>
            <h3>Discipline:</h3>
            <p>{note.discipline}</p>
            <h3>Techniques:</h3>
            <p>{note.techniques}</p>      
            <h3>Feel Scale:</h3>
            <p>{note.feel_rating}</p>
            <h3>Insights:</h3>
            <p>{note.insights}</p>
            <Link href={`/notes/${note.id}`}>Details</Link>
          </div> 
      ))}
    </div>
  </>
}
