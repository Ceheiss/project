'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth-status', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setLoggedIn(data.isLoggedIn);
        }
      } catch (error) {
        setLoggedIn(false);
        console.error('Failed to get the status,', error)
      }
    }
    checkAuthStatus()
  }, []);

  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      setLoggedIn(event.detail.isLogged);
    }
    window.addEventListener("authChange", handleStatusChange as EventListener);
    // Clean up listener on unmount
    return () => window.removeEventListener("authChange", handleStatusChange as EventListener);
  }, [])


  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setLoggedIn(false);
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
        {/* Need to dynamically show log in and register or log out */}
        {isLoggedIn ?
          <>
            <div onClick={handleLogout} >Log Out</div>
            <Link href="/notes">Notes</Link>
          </>
         :
          <>
            <Link href="/login">Log In</Link>
            <Link href="/register">Register</Link>
          </>
        }
        
      </div>
    </nav>
  )
}