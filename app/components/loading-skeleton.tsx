"use client";

import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const loadingSteps = [
  "Initializing request...",
  "Retrieving data...",
  "Processing request...",
  "Asking our AI...",
  "Refining response...",
  "Finalizing output...",
  "Almost there...",
];

const estimatedResponseTime = 8000;
const longResponseTime = 30000;

export function LoadingSkeleton() {
  const [currentStep, setCurrentStep] = useState(0);
  const [delay, setDelay] = useState(
    estimatedResponseTime / loadingSteps.length
  );

  useEffect(() => {
    if (currentStep < loadingSteps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);

        const nextDelay = delay * 1.6;

        setDelay(Math.min(nextDelay, longResponseTime / loadingSteps.length));
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentStep, delay]);

  return (
    <div className="flex flex-col items-center justify-center">
      <DotLottieReact autoplay loop className="w-96" src={"/wait.lottie"} />
      <motion.p
        key={currentStep}
        animate={{ opacity: 1, y: 0 }}
        className="text-default-400 text-sm sm:text-lg font-medium"
        exit={{ opacity: 0, y: -10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        {loadingSteps[currentStep]}
      </motion.p>
    </div>
  );
}
