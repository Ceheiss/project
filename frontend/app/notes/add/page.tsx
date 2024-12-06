'use client'

import './add.css';

export default function AddNote() {
  return <>
    <h1>Log your training!</h1>
    <form className="form">
      <div>
        <input placeholder="Discipline"/>
      </div>
      <div>
        <input placeholder="Techniques"/>
      </div>
      <div>
      <input placeholder="Feel Scale"/>
      </div>
      <div>
        <textarea placeholder="Insights"/>
      </div>  
      <button>Add</button>
    </form>
  </>
}
