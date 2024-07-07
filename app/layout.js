import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arena of Valor : Assistant ",
  description: "เว็บที่ใช้ช่วยคุณในเรื่องต่างๆของเกม ROV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
