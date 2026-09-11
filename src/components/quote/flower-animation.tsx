"use client";

import { motion } from "framer-motion";

const petals = [
  { angle: 0, tone: "bg-blue-100" },
  { angle: 45, tone: "bg-red-100" },
  { angle: 90, tone: "bg-blue-100" },
  { angle: 135, tone: "bg-red-100" },
  { angle: 180, tone: "bg-blue-100" },
  { angle: 225, tone: "bg-red-100" },
  { angle: 270, tone: "bg-blue-100" },
  { angle: 315, tone: "bg-red-100" },
];

export function FlowerAnimation() {
  return (
    <motion.div
      aria-hidden="true"
      className="relative h-56 w-full max-w-sm"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {petals.map((petal) => (
        <motion.span
          className={
            "absolute left-1/2 top-1/2 block h-20 w-9 rounded-full border border-line " +
            petal.tone
          }
          key={petal.angle}
          style={{
            transform:
              "translate(-50%, -96%) rotate(" + petal.angle + "deg)",
            transformOrigin: "50% 96%",
          }}
          animate={{ opacity: [0.62, 1, 0.62] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: petal.angle / 360,
          }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 block h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground bg-background" />
    </motion.div>
  );
}
