import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import AppText from './AppText';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        'Ayurveda is an alternative medicine system with historical roots in the Indian subcontinent. It is heavily practiced in India and Nepal, where around 80% of the population report using Ayurveda.',
        1000, // wait 1s before backspacing
        'Ayurveda is an alternative medicine system with historical roots in the Indian subcontinent. It is heavily practiced in India and Nepal,',
      ]}
      
      speed={70} // Set the speed to match your previous avgTypingDelay
      style={{ fontSize: '1.5em' }} // Adjust style as needed
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
