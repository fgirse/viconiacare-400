// components/LottieAnimation.tsx
import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

// Define the prop types
interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, loop = true, autoplay = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
      });

      return () => animRef.current?.destroy(); // Cleanup on unmount
    }
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} />;
};

export default LottieAnimation;