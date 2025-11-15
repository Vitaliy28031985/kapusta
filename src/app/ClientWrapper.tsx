"use client";

import { SessionProvider } from "next-auth/react";
import AppLoader from "@/hoc/app-loader";
import Header from "./components/Header";


export default function ClientWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <AppLoader>
        <Header />
        {children}
      </AppLoader>
    </SessionProvider>
  );
}