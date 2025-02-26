import React from 'react';

interface FeatureProps {
  title: string;
  icon: string;
  description: string;
  position: number;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ title, icon, description, position, index }) => {
  const translateAmt = position >= index ? index * 100 : index * 100 - 100 * (index - position);

  return (
    <div
      style={{ transform: `translateX(-${translateAmt}%)` }}
      className={`relative flex min-h-[250px] w-10/12 max-w-lg shrink-0 flex-col justify-between overflow-hidden p-8 shadow-lg md:w-3/5 ${
        index % 2 ? 'bg-slate-900 text-white' : ' bg-white text-slate-900'
      }`}
    >
      <div className="absolute right-4 top-2 h-20 w-16 text-7xl lg:size-36">
        <img src={icon} alt={title} />
      </div>
      <h3 className="mb-8 text-[1.33rem] font-bold lg:text-[2.33rem]">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Feature;