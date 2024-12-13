'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Navbar() {
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const router = useRouter();
  const checkAuthUrl = `${baseURL}/auth-status`;
  const logoutUrl = `${baseURL}/logout`;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(checkAuthUrl, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setLoggedIn(data.isLoggedIn);
      } catch (error) {
        setLoggedIn(false);
        console.error('Failed to get the status:', error)
      }
    }
    checkAuthStatus()
  }, [checkAuthUrl]);

  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      setLoggedIn(event.detail.isLogged);
    }
    window.addEventListener("authChange", handleStatusChange as EventListener);
    // Clean up listener on unmount
    return () => window.removeEventListener("authChange", handleStatusChange as EventListener);
  }, []);


  async function handleLogout() {
    try {
      const response = await fetch(logoutUrl, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Error submitting the form.', error);
    }
  }

  return (
    <nav className="navbar">
      <div className="left">
        <div className="logo-container">
          <Link href="/">
            <Image
              src="/dojoscrolls.svg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              alt="A kimono and with the word dojoscrolls written to the side"
            />
          </Link>
        </div>
      </div>
      <div className="right">
        <Link href="/">Home</Link>
        {/* Need to dynamically show log in and register or log out */}
        {isLoggedIn ?
          <>
            <div onClick={handleLogout}>Log Out</div>
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