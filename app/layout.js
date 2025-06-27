import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "CineScope Movies App",
  description: "Find your favorite movies ratings and recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <NextTopLoader color="#1dd1a1" speed={400} crawlSpeed={400}/>
        {children}
      </body>
    </html>
  );
}
