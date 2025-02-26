import dynamic from 'next/dynamic';

const MyComponent = dynamic(() => import('@/src/components/FeatureAnimated'), { ssr: false });

const Page = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};

export default Page;

