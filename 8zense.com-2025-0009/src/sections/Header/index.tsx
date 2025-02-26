import { Button } from "@/src/components/ui/button2";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
const Header = () => {
	return (
		<div className="w-full h-[93vh] flex items-center justify-center flex-col text-center relative overflow-hidden gap-6 pt-[500px]">
			<h1 className="text-7xl font-bold leading-snug">
				All your business <br />
				expenses in one place.
			</h1>
		
			<div className="flex items-center justify-center gap-6 mb-[50px]">
				
			
			</div>

			<div className="min-h-[852px] w-[1200px] bg-slate-800 rounded-lg" />
			
			<SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
			
		</div>
	);
};

export default Header;
