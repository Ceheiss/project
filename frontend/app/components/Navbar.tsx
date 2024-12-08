'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error submitting the form.');
    }
  }
  return (
    <nav className="navbar">
      <div className="left">
        <div>Logo</div>
      </div>
      <div className="right">
        <Link href="/">Home</Link>
        <Link href="/notes">Notes</Link>
        {/* Need to dynamically show log in and register or log out */}
        <Link href="/login">Log In</Link>
        <Link href="/register">Register</Link>
        <div onClick={handleLogout} >Log Out</div>
      </div>
    </nav>
  )
}