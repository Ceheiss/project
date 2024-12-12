'use client'
import { useState, SyntheticEvent } from "react";
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmation: '',
  });
  const url = `${baseURL}/register`;
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password,
      confirmation: formData.confirmation
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      const authChange = new CustomEvent("authChange", { detail: { isLogged: true } });
      window.dispatchEvent(authChange)
      router.push("/")
    } catch (error: any) {
      console.error('Error submitting the form:', error.message);
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
        <section className="form-section">
            <input name="confirmation" placeholder="Confirm Password" value={formData.confirmation}
          onChange={handleChange} type="password" />
        </section>
        <button type="submit">Register</button>
    </form>
  )
}