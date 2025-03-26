import React from "react";
import { motion } from "framer-motion";

const Particles = () => {
  const particles = Array.from({ length: 25 });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0, // Ensures particles stay behind content
      }}
    >
      {particles.map((_, index) => {
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "50%",
              filter: "blur(2px)",
              top: `${top}vh`,
              left: `${left}vw`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              delay,
            }}
          />
        );
      })}
    </div>
  );
};

export default Particles;
