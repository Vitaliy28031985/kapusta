'use client'
import PublicLoader from "@/hoc/public-loader";
import Authorization from "./components/Authorization/Authorization";


export default function Home() {
  return (
    <div className="">
      <PublicLoader>
        <Authorization />
      </PublicLoader>
    </div>
  );
}
