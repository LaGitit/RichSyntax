"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SyntaxLabComingSoon() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (isVisible) {
        await controls.start({
          boxShadow: [
            "0 0 0px rgba(77, 181, 255, 0)",
            "0 0 8px rgba(77, 181, 255, 0.2)",
            "0 0 0px rgba(77, 181, 255, 0)",
          ],
          transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
        });
      }
    };
    sequence();
  }, [controls, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 rounded-full"
        >
          <motion.div
            animate={controls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
            className="relative group cursor-default"
          >
            <div className="bg-primary/90 backdrop-blur-sm border border-accent/20 rounded-lg p-3 shadow-xl overflow-hidden transition-all duration-300 hover:border-accent/40">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-accent text-xs font-mono flex items-center"
                >
                  {"{ }"}
                </motion.span>

                <p className="text-xs font-mono text-accent flex items-center">
                  <span>SYNTAXLAB</span>
                  <span className="inline-block w-1.5 h-1.5 ml-2 bg-accent rounded-full animate-pulse"></span>
                </p>
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="mt-2 overflow-hidden"
                  >
                    <p className="text-[10px] text-gray-400 font-mono leading-tight">
                      Experimental dev playground coming soon
                    </p>
                    <div className="flex justify-between items-center mt-1.5">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-[10px] text-accent/70 hover:text-accent transition-colors font-mono"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVisible(false);
                        }}
                      >
                        [dismiss]
                      </motion.button>
                      <motion.div
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[8px] text-gray-500 font-mono"
                      >
                        v0.0.1-alpha
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isHovered && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
