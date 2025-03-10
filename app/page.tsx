import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="">
      <SignedOut>
          Welcome to imagify PLease login to continue
      </SignedOut>
    </div>
  );
}
