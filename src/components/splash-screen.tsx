"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPLASH_KEY = "umkm-splash-shown";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [startPulse, setStartPulse] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem(SPLASH_KEY);
    if (shown) {
      setVisible(false);
    } else {
      sessionStorage.setItem(SPLASH_KEY, "true");
      const pulseTimer = setTimeout(() => setStartPulse(true), 900);
      const exitTimer = setTimeout(() => setVisible(false), 2500);
      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(exitTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              startPulse
                ? { opacity: 1, scale: [1, 1.03, 1] }
                : { opacity: 1, scale: 1 }
            }
            transition={
              startPulse
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <Image
              src="/pedtengah.png"
              alt="Pedtengah"
              width={280}
              height={77}
              sizes="(max-width: 768px) 200px, 280px"
              className="h-auto w-[200px] md:w-[280px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
