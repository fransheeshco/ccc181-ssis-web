import type { Metadata } from "next";
import "./globals.css";
import { ClientAuthWrapper } from "@/app/context/ClientAuthWrapper"; // 👈 import wrapper

export const metadata: Metadata = {
  title: "Student Information System",
  description: "Manage colleges, students, and programs easily.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}
