import React from "react";
import Image from "next/image";
import EmailModal from "@/src/components/EmailModal";
import {Button} from "@/src/components/ui/button2";
import Skizze from "@/public/images/skizze.png";

import Space from "@/public/images/space02.svg";

const IntroWebside = () => {
  return (
    <>
      <section>
        <div className="grid-rows-16 grid grid-cols-12 gap-1">
          <div className="col-span-7 col-start-1 row-span-3 row-start-4"></div>

          <div className="relative col-span-6 col-start-7 row-span-7 row-start-1 mr-5 px-1">
            <p className="mb-5 mt-7 rounded-xl bg-slate-100 px-3 py-1 text-right text-[.9rem] font-black text-slate-50 sm:text-2xl md:text-[2.33rem] md:font-semibold md:leading-9 lg:mr-12 lg:p-5 lg:px-5 lg:py-3 lg:text-6xl lg:font-semibold">
              &laquo;the beauty of a living thing is not the atoms that go into
              it -but the way those atoms are put together...&raquo;
            </p>

            <div className="relative -top-2 left-10 flex h-16 w-16 translate-x-16 transform flex-col items-center justify-center rounded-full bg-orange-400 text-xs leading-3 text-white shadow-xl shadow-gray-400/50 sm:h-20 sm:w-20 sm:text-2xl md:-top-1 md:h-24 md:w-24 md:translate-x-44 md:transform md:text-2xl lg:left-2/4 lg:h-32 lg:w-32 lg:text-3xl">
              <p className="relative z-10 text-sm font-black md:text-2xl md:leading-4 lg:text-3xl">
                Carl
              </p>

              <p className="text-sm font-black md:text-2xl md:leading-4 lg:text-3xl">
                Sagan
              </p>
            </div>
          </div>
        </div>

        <section className="h-33vh mx-auto lg:w-2/3 lg:bg-[url('/images/space02.svg')] lg:bg-contain lg:bg-no-repeat">
          <div className="relative -z-10 -mt-60 h-[33vh] w-[77vw] lg:h-[100vh] lg:w-[90vw]">
            <Image src={Space} sizes="100vw" alt="space Illustration" />
          </div>

          <section className="container mx-auto  grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 lg:grid-cols-1">
            <h1 className="via lg:top lg:leading-0 relative bg-slate-600 bg-gradient-to-b from-slate-900 to-orange-500 bg-clip-text px-1 text-[3.0rem] font-black uppercase leading-10 text-transparent md:text-center md:text-[3.750rem] md:leading-[4rem] lg:text-8xl lg:tracking-wider">
              Interiore Design
            </h1>

            <div className="relative top-3 h-[24vh] w-[75vw] lg:w-[45vw]">
              <Image src={Skizze} fill sizes="100vw" alt="Skizze" />
            </div>

            <p className="my-4 -mt-12 text-base text-slate-700 md:my-6 md:text-lg">
              <span className="font-bold text-zenseSignal2">8zenSe.com</span>{" "}
              begleitet, beratet und unterstützt Sie professionell bei der
              Planung und Umsetzung Ihres individuellen Interieure Desings in
              Wohnung, Haus, Büro ofer Praxis. Sprechen Sie uns an - Wir
              freuen uns auf Sie!
            </p>
          </section>

          <div className="bg-neutral-300 mb-20 flex flex-col">
            <EmailModal />
          </div>

          <section className="container mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 lg:grid-cols-1">
            <h1 className="lg:leading-0 via lg:top relative -mt-12 bg-slate-600 bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text px-1 text-[3.0rem] font-black uppercase leading-10 text-transparent md:text-center md:text-[3.750rem] lg:text-9xl lg:text-[4rem] lg:tracking-wider">
              Timeless Design
            </h1>

            <div className="relative mt-3 h-[24vh] w-[75vw] lg:w-[45vw]">
              <Image src={Skizze} fill sizes="100vw" alt="Skizze" />
            </div>

            <p className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
              <span className="font-bold text-zenseSignal2">8zenSe.com</span>{" "}
              steht für individuelles, extravagantes und exklusives Desing aus
              dem Marterial Beton in unterschiedlichen Designvariationen und
              Designform{" "}
            </p>

            {/*<Button />*/}
          </section>
        </section>

        {/*  <section className="shuffle-Hero -mt-44 ">*/}
      </section>
    </>
  );
};

export default IntroWebside;
