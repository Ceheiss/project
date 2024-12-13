'use client'

import Image from 'next/image'
import './globals.css';

function NotFoundPage() {
	return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>You must be lost traveller</h2>
      <Image
        src="/giphy.webp"
        width={300}
        height={300}
        alt="Bruce Lee looking confused"
      />
    </div>
  )
}

export default NotFoundPage