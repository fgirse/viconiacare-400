import React from 'react';
import ClientWrapper from './ClientWrapper';
import { useTranslations } from 'next-intl';

// Define the type for the array elements
interface Feature {
  title: string;
  icon: string;
  description: string;
}

// Define the props type
interface ArrayGeneratorProps {
  serverArray: Feature[];
}

// This is a Server Component
const ArrayGenerator: React.FC<ArrayGeneratorProps> = ({ serverArray }) => {
  const t = useTranslations("CollapsCard");

  const features: Feature[] = [
    {
      title: 'Individualität',
      icon: '/images/Individualität.gif',
      description: t('Text_06'),
    },
    {
      title: 'Networking',
      icon: '/images/networking03.gif',
     description: t('Text_07'),
    },
    {
      title: 'Top Qualität',
      icon: '/images/qualität.gif',
      description: t('Text_08'),
    },
    {
      title: 'Exklusiv',
      icon: '/images/exclusive.svg',
      description: t('Text_09'),
    },
    {
      title: t('zeitlos'),
      icon: '/images/zeitlos.png',
      description: t('Text_10'),
    },
  ];

  return <ClientWrapper serverArray={features} />;
};

export default ArrayGenerator;