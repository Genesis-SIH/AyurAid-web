import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Ayurveda is an alternative medicine system with historical roots in the Indian subcontinent. It is heavily practiced in India and Nepal, where around 80% of the population report using Ayurveda.",
      ]}
      speed={70}
      style={{ fontSize: "1.5em" }}
    />
  );
};

export default TypingAnimation;
