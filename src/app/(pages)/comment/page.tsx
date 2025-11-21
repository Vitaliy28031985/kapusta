'use client'
import CommentsContainer from "@/app/components/comments/CommentsContainer";
import PrivateLoader from "@/hoc/private-loader";



export default function Home() {
  return (
    <div className="">
      <PrivateLoader>
        <CommentsContainer />
      </PrivateLoader>
    </div>
  );
}
