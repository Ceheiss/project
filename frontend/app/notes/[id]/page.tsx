"use client";

import { useEffect, useState } from "react";

export default function NoteDetails({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    fetch(`http://localhost:5000/notes/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setNote(data[0]);
      });
  }, [id]);

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
    </div>
  );
}
