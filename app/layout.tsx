import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/next"
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Strictly typing the metadata object
export const metadata: Metadata = {
  title: "StackBuildr - Amber Parker | Full Stack Developer",
  description: "StackBuildr: Modern web development with cutting edge technologies. Building innovative apps and experiences with React, Next.js, and more.",
  keywords: "full-stack developer, React, Next.js, web development, JavaScript, TypeScript, modern web apps",
  authors: [{ name: "Amber Parker" }], // 'author' is deprecated in modern Next.js metadata, use 'authors' array
  openGraph: {
    title: "StackBuildr - Full Stack Developer",
    description: "Building the future one stack at a time. Modern web development with React, Next.js, and cutting-edge technologies.",
    type: "website",
    url: "https://stackbuildr.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackBuildr - Full-Stack Developer",
    description: "Building modern web experiences with cutting-edge technologies.",
  },
};

// Typing the layout props
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}