'use client'
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password
    }
    
    try {
      const response = await fetch(`${baseURL}/login`, {
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

      // emit an event to notify the navbar
      const authChange = new CustomEvent("authChange", { detail: { isLogged: true } });
      window.dispatchEvent(authChange)
      router.push("/")
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  }


  return (
    <form onSubmit={handleSubmit} className='page-container'>
        <section className="form-section">
            <input name="username" placeholder="Username" value={formData.username}
            onChange={handleChange} type="text" />
        </section>
        <section className="form-section">
            <input  name="password" placeholder="Password" value={formData.password}
          onChange={handleChange} type="password" />
        </section>
        <button type="submit">Log In</button>
    </form>
  )
}