import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Kapusta-report",
  description: "Smart Finance",
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return <>{children}</>;
}
