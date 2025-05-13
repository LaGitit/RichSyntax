"use client";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue } from "framer-motion";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function Hero() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: "#4db5ff" },
            move: {
              speed: 0.3,
              attract: { enable: true, rotateX: 600, rotateY: 600 },
            },
            opacity: { value: 0.7, random: true },
            size: { value: 2, random: true },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="flex items-center font-mono text-base sm:text-lg md:text-2xl text-accent cursor-default"
          onMouseMove={handleMouseMove}
          whileHover={{ scale: 1.05 }}
        >
          <TypeAnimation
            sequence={[
              "{ \u00A0\u00A0 }",
              500,
              "{ R }",
              1000,
              "{ RichSyntax }",
            ]}
            wrapper="span"
            speed={30}
            style={{ display: "inline-block" }}
            cursor={false}
            repeat={0}
          />
          <motion.span
            className="ml-1 h-6 w-0.5 bg-accent inline-block"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              transition: {
                repeat: Infinity,
                duration: 1,
                times: [0, 0.5, 1],
                repeatDelay: 2,
              },
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="z-10 text-center px-4">
        <div className="relative group z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5 }}
            className="text-xs md:text-sm text-gray-400 mb-2 hover:text-gray-300 transition-colors cursor-default"
          >
            (Legal: Abdulateef Oluwashina Lawal)
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-[10px] text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Full legal name
            </span>
          </motion.p>
        </div>

        <TypeAnimation
          sequence={[
            "Richard Lawal",
            1000,
            "Front-End Architect",
            1000,
            "UI/UX Engineer",
            2000,
          ]}
          wrapper="h1"
          speed={40}
          deletionSpeed={60}
          repeat={Infinity}
          className="text-4xl md:text-6xl font-bold font-orbitron"
          style={{ display: "inline-block" }}
          cursor={true}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="text-xl md:text-2xl mt-4 font-sans"
        >
          Bridging <span className="text-accent">Economic Rigor</span> with{" "}
          <span className="text-accent">Code</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label="View projects section"
          >
            <span className="relative z-10">Explore My Logic</span>
            <span
              className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-accent to-transparent group-hover:w-full transition-all duration-500 ease-out"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
