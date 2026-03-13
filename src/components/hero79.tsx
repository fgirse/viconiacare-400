import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "../../public/Assets/SVG/ViconiaLogoQueroBG.svg";
import { Button } from "@/components/ui/button";
import Graffity from "../../public/Assets/Images/Graffity03.png";
import CTAButton from "../../public/Assets/SVG/kalenderbutton.svg";

interface Hero79Props {
  className?: string;
}

const Hero79 = ({ className }: Hero79Props) => {
  return (
    <section
      className={cn(
        "dark relative h-svh w-svw bg-background pt-1 pb-2",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[url('/Assets/SVG/Herobg.svg')] bg-cover bg-center bg-no-repeat opacity-10"
        aria-hidden="true"
      />

      <div className="relative flex w-full items-center justify-center overflow-visible py-2">
        {/*<h1 aria-label="Neu in Hamburg" className="text-center text-[4rem] lg:text-[8rem]">
          <span className="graffiti-yellow">Neu in</span>
          <span className="graffiti-pink">Hamburg</span>
        </h1>*/}
      </div>
      <div className="container lg:top-[30vh] flex h-full flex-col justify-between px-5 xl:px-20">
       
        <div className="flex flex-col items-end justify-between">
           <Image
              src={Graffity} 
              alt="Viconia Care - Innovative Pflegeplattform"
              width={600}
              className=" relative top-0 w-72 left-2 rotate-12 sm:top-[1vh] sm:size-80 lg-[30vw] lg:hh"
          />
<Image
              src={CTAButton} 
              alt="Viconia Care - Innovative Pflegeplattform"
              width={600}
              className=" z-10 relative top-[1vh] w-36 left-2 sm:size-60 md:t op-[35vh] lg:w-96 lg:left:[30vw] lg:top-[30vh]"
          />
          
          <div className="flex w-full flex-col gap-8 md:w-2/3">
           <Image
              src={Logo}
              alt="Viconia Care - Innovative Pflegeplattform"
              width={600}
              className="size-full relative top-[-10vh] bg-stone-200/30 p-6 rounded-lg sm:size-96 sm:top-[-1vh]"
              
          />
         <h1 className="relative text-center top-[2vh] text-[2.66rem] -yellow">ambulante pflege</h1>
          </div>
          <Button
            variant="ghost"
            className="mt-[-20vh] items-center gap-2 text-foreground hover:bg-transparent sm:-mt-[24] md:flex lg:mt-[10vh]"
          >
            <span className="text-2xl">Lese Mehr</span>
            <ArrowDown className="size-6!" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero79 };
