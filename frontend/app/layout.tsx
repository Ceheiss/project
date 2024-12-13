import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const firaMono = localFont({
  src: [
    {
      path: "./fonts/Fira_Mono/FiraMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Fira_Mono/FiraMono-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Fira_Mono/FiraMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fira-mono",
});

const lato = localFont({
  src: [
    {
      path: "./fonts/Lato/Lato-Light.ttf",
      weight: "200",
    },
    {
      path: "./fonts/Lato/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lato/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lato/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "DojoScrolls",
  description: "An app to log your Martial Arts journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/monogram-hq.png" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${firaMono.variable} ${lato.variable}  antialiased`}
      >
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
