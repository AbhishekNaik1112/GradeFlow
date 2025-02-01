import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "GradeFlow",
  description: "Meetings on the go",
  icons: {
    icon: '/icons/ovid-header.svg',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body >
          {children}
        </body>
      </html>
  );
}