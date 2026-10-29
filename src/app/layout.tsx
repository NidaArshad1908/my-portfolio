import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nida Arshad Chaudhry | Full Stack Developer",
  description: "Portfolio of Nida Arshad Chaudhry, a Senior Full Stack Software Engineer specializing in Next.js, NestJS, and React Native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className={`${quicksand.className} antialiased`}>{children}</body>
    </html>
  );
}
