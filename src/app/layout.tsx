
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/app/auth/auth";
import ClientWrapper from "./ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kapusta",
  description: "Smart Finance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await auth()
  // return (
  //   <SessionProvider session={session}>
  //     <AppLoader>
  //   <html lang="en">
  //     <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  //       <Header />
  //       {children}
  //     </body>
  //       </html>
  //     </AppLoader>
  //   </SessionProvider>
  // );

   return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper session={session}>{children}</ClientWrapper>
      </body>
    </html>
  );
}
