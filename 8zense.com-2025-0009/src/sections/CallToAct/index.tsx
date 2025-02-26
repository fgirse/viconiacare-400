import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslations } from "next-intl";
import EmailModal from "@/src/components/EmailModal";
import { EmailTemplate } from "@/src/components/emails/email-template";
import ContactForm   from "@/src/app/[locale]/contact-form/page";

const CallToAct = () => {
  const t = useTranslations("CallToAct");

  return (
    <div className="bg-orange-400/90 flex flex-col justify-center items-center">
      <DotLottieReact
        src="/images/calltoact.lottie"
        loop
        autoplay
        className="relative -top-20 w-[85vw] h-[86vh] mx-auto"
      />
      <h1 className="relative -top-44  font-bold text-neutral-100 text-6xl text-center">
        {t("Fragen")} <span className="text-9xl">❓❓❓</span>
      </h1>
      <p className="bg-stone-400 shadow-xl w-2/3 text-between p-3 rounded-md shado relative -top-36 text-center text-neutral-100 text-lg font-raleway">
        {t("FragenText01")}
      </p>
      <div className="relative -top-32">
        <ContactForm />
      </div>
    </div>
  );
};

export default CallToAct;
