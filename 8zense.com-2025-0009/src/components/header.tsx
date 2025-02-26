// header.tsx
"use client";
// the :point_up: use client was necessary to make this module work
import { SignInButton, SignedIn, SignUpButton, SignedOut, UserButton, ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="bg-transparent">
      <Image src="/images/LogoEZ990.svg" alt="8zense Logo" width={54} height={54} className="bg-black ml-3 mt-3" />
      <div className="mt-5 w-full items-center bg-zinc-100 p-2 sm:justify-end"> 
      <div className="">
        
        <div className="flex flex-col gap-3">
        <SignedOut>
            <SignInButton>
              <button className=" py-2 px-3 bg-slate-600 text-center text-white w-36">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>  
          
        
        </div>
      </div>
    </nav>
  );
};
export default Header;