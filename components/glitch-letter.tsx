import React, { useEffect, useState } from "react";
import { Text } from "react-native";

interface GlitchLetterProps {
  target: string;
  speed?: number;
  frames?: number;
}

export const GlitchLetter = ({
  target,
  speed = 50,
  frames = 8,
}: GlitchLetterProps) => {
  const theLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [frame, setFrame] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (target.length !== 1) {
      console.warn("GlitchLetter expects a single character as target.");
      return;
    }

    if (frame >= frames) {
      setDisplay(target);
      return;
    }

    const timer = setTimeout(() => {
      const randomChar =
        theLetters[Math.floor(Math.random() * theLetters.length)];
      setDisplay(randomChar);
      setFrame((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [frame, target, speed, frames]);

  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
      }}
    >
      {display}
    </Text>
  );
};

export default GlitchLetter;
