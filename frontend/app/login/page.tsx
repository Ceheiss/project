'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
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
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      // Clear the form or show a success message
      router.push("/")
    } catch (error) {
      console.error('Error submitting the form:', error.message);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input name="username" placeholder="Username" value={formData.username}
            onChange={handleChange} type="text" />
        </div>
        <div>
            <input  name="password" placeholder="Password" value={formData.password}
          onChange={handleChange} type="password" />
        </div>
        <button type="submit">Log In</button>
    </form>
  )
}