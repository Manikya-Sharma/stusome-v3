import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/chunks/Navbar";
import Provider from "./providers/client-provider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "stusome",
  description: "Student Social Media: The social media website you need",
  openGraph: {
    title: "stusome",
    description: "Social media by students, for students",
    type: "website",
    url: "https://stusome.vercel.app",
    siteName: "stusome",
    images: [
      {
        url: "https://stusome.vercel.app/logo.png",
      },
    ],
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn("bg-background font-sans antialiased", inter.variable)}
      >
        <Provider session={session}>
          <Navbar />
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
