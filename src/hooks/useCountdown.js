"use client";

import { useState, useEffect } from "react";
import { REGISTRATION_START } from "@/lib/constants";

/**
 * useCountdown Hook
 * Targets REGISTRATION_START from constants.js by default.
 * Accepts an optional targetDate (string or Date) to target a different date,
 * e.g. for a closing ceremony countdown.
 */
export function useCountdown(targetDate = REGISTRATION_START) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const target = new Date(targetDate || REGISTRATION_START).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      };
    };

    // Calculate immediately on mount
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default useCountdown;
