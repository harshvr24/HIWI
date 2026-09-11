"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrambledTextProps {
  text: string;
  className?: string;
  /**
   * Lets a parent drive the scramble instead of the span's own hover — needed when the
   * real hover target is bigger than the text (e.g. an orbital node's circle sits above
   * its label). Omit it and the span keeps handling its own hover.
   */
  active?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function ScrambledText({
  text,
  className = "",
  active,
}: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const selfDriven = active === undefined;
  const scrambling = selfDriven ? isHovered : active;

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (scrambling) {
      const cleanup = scramble();
      return cleanup;
    } else {
      setDisplayText(text);
    }
  }, [scrambling, scramble, text]);

  return (
    <span
      className={className}
      onMouseEnter={selfDriven ? () => setIsHovered(true) : undefined}
      onMouseLeave={selfDriven ? () => setIsHovered(false) : undefined}
    >
      {displayText}
    </span>
  );
}
