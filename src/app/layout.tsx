import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guilherme Rafael de Souza | 3D Visualization & Digital Marketing",
  description: "Portfolio of Guilherme Rafael de Souza - Expert in 3D Product Visualization, Performance Editing, and Strategic Management. CGI renderings, optimized advertisements, and cross-channel marketing strategies.",
  keywords: ["3D Visualization", "CGI", "Product Rendering", "Video Editing", "Digital Marketing", "Instagram Marketing", "Landing Page Optimization", "Performance Editing", "Motion Graphics"],
  authors: [{ name: "Guilherme Rafael de Souza" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Guilherme Rafael de Souza | 3D Visualization & Digital Marketing",
    description: "CGI renderings, optimized advertisements, and cross-channel marketing strategies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Rafael de Souza | 3D Visualization & Digital Marketing",
    description: "CGI renderings, optimized advertisements, and cross-channel marketing strategies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
