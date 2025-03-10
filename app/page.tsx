import { SignedOut } from "@clerk/nextjs";


export default function Home() {
  
  return (
    <div className="">
      <SignedOut>
          Welcome to imagify PLease login to continue
      </SignedOut>
    </div>
  );
}
