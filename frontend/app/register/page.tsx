'use client'
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmation: '',
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
      password: formData.password,
      confirmation: formData.confirmation
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
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
      // Clear the form or show a success message
      setFormData({
        username: '',
        password: '',
        confirmation: '',
      });
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
        <div>
            <input name="confirmation" placeholder="Confirm Password" value={formData.confirmation}
          onChange={handleChange} type="password" />
        </div>
        <button type="submit">Register</button>
    </form>
  )
}