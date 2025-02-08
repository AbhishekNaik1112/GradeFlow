import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GradeFlow",
  description: "Smarter studying!",
  icons: {
    icon: "/publiclogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  );
}
