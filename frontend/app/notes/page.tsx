import Link from 'next/link';
import './notes.css';

export default async function Notes() {
  const url = "http://localhost:5000/notes";
  let notes = [];
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    notes = await response.json();
  } catch (error: any) {
    console.error(error.message);
  }

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
