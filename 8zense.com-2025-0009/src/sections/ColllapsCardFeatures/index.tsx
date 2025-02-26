import ArrayGenerator from '@/src/sections/ColllapsCardFeatures/ArrayGenerator';

export default function Home() {

  interface ArrayGeneratorProps {

    serverArray: any[];}

  return (
    <main>
     {/* <h1>Server to Client Props Example</h1>*/}     <ArrayGenerator serverArray={[]} />
    </main>
  );
}