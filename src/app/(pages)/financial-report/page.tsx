'use client'
import ReportContainer from "@/app/components/report/Report";
import PrivateLoader from "@/hoc/private-loader";


export default function Home() {
  return (
    <div className="">
      <PrivateLoader>
        <ReportContainer />
      </PrivateLoader>
    </div>
  );
}
