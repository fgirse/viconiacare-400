// pages/story.js
import React, { useState } from 'react';
import LottieAnimation from '@/src/components/LottieAnimation';

const StoryPage = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const stories = [
    '/public/images/lotti.json',
    '/public/images/lotti2.json',
    '/public/images/lotti3.json',
    '/public/images/lotti4.json',                   
    '/public/images/lotti5.json',
    '/public/images/lotti6.json',                   
    // Add more story paths here
  ];

  const goToNextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
    }
  };

  const goToPreviousStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Animated Story</h1>
      <LottieAnimation animationPath={stories[currentStory]} />
      <div>
        <button className="" onClick={goToPreviousStory} disabled={currentStory === 0}>
          Previous
        </button>
        <button onClick={goToNextStory} disabled={currentStory === stories.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryPage;