import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// This is the layout for the entire app. It wraps around all the pages and components
export const metadata: Metadata = {
  title: "Examigo",
  description: "I'm workin' here!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Auth provider  */}
        <AuthProvider >
          {children}
        </AuthProvider>
        </body>
    </html>
  );
}
