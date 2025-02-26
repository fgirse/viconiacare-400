import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Feature from '@/src/sections/ColllapsCardFeatures/Feature'; // Import the Feature component
import { useTranslations } from 'next-intl';

// Define the type for the array elements
interface Feature {
  title: string;
  icon: string;
  description: string;
}

// Define the props type
interface ClientWrapperProps {
  serverArray: Feature[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ serverArray }) => {
  const [position, setPosition] = useState(0);

  const shiftLeft = () => {
    if (position > 0) {
      setPosition((pv) => pv - 1);
    }
  };

  const shiftRight = () => {
    if (position < serverArray.length - 1) {
      setPosition((pv) => pv + 1);
    }
  };

  const t = useTranslations('CollapsCard');

  return (
    <section className="overflow-hidden bg-neutral-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between gap-4">
          <h2 className="text-stone-600 text-4xl font-bold leading-[1.2] md:text-5xl">
            {t('Text_01')} <span className="text-slate-400"> {t('Text_02')}</span>
          </h2>
          <div className="flex gap-2">
            <button
              className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftLeft}
            >
              <FiChevronLeft />
            </button>
            <button
              className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftRight}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {serverArray.map((feat, index) => (
            <Feature {...feat} key={index} position={position} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientWrapper;