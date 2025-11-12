import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Kapusta-comment",
  description: "Smart Finance",
};

export default function CommentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return <>{children}</>;
}
