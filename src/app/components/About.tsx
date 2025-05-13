"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import type { TooltipItem } from "chart.js";

const Radar = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Radar),
  { ssr: false }
);
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const skillData = {
    labels: [
      "Advanced JavaScript &\nReact Ecosystem",
      "UI/UX &\nDesign Systems",
      "TypeScript",
      "Economic\nLogic",
      "ACCA\nAwareness",
    ],
    datasets: [
      {
        label: "Skill Proficiency",
        data: [90, 88, 80, 85, 80],
        backgroundColor: "rgba(77, 181, 255, 0.2)",
        borderColor: "#4db5ff",
        borderWidth: 2,
        pointBackgroundColor: "#4db5ff",
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltip: {
      backgroundColor: "var(--color-primary)",
      borderColor: "var(--color-accent)",
      titleColor: "var(--color-text)",
      bodyColor: "var(--color-text)",
      padding: 12,
      cornerRadius: 8,
    },
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          display: false,
          backdropColor: "transparent",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          color: "#e6e6e6",
          font: {
            family: "'Inter', sans-serif",
            size: isMobile ? 10 : 12,
          },
          callback: function (value: string) {
            return value;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"radar">) => {
            const descriptions = [
              "React & Next.js: Component architecture, routing, and SSR fluency.",
              "UI/UX & Design Systems: Thoughtful interfaces with scalable atomic design.",
              "TypeScript: Type-safe logic, interfaces, and clean error-resistant code.",
              "Economic Logic: Systemic thinking, modeling instincts, and analytical clarity.",
              "ACCA Awareness: Foundational grasp of reporting, audit, and finance structure.",
            ];
            return descriptions[context.dataIndex];
          },
        },
      },
      legend: {
        labels: {
          color: "#e6e6e6",
          font: { family: "'Orbitron', sans-serif" },
        },
      },
    },
  };

  return (
    <>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <section
        ref={sectionRef}
        id="about"
        className="relative py-20 px-4 max-w-6xl mx-auto z-10"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/0 via-primary/70 to-primary" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="backdrop-blur-sm bg-primary/10 rounded-xl p-8 border border-gray-800/50"
        >
          <div className="mb-12">
            <motion.div
              className="w-20 h-0.5 bg-accent mb-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.h2
              className="text-3xl font-orbitron"
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent">{"{ "}</span>
              The <span className="text-accent">Algorithm</span> Behind My Work
              <span className="text-accent">{" }"}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4 font-sans">
                <p className="text-gray-300">
                  <span className="text-accent font-medium">Economist</span>{" "}
                  with a BSc and a growing background in accounting through the{" "}
                  <span className="text-accent font-medium">ACCA program</span>.
                  I`m also a{" "}
                  <span className="text-accent font-medium">
                    frontend developer
                  </span>{" "}
                  steadily transitioning into full-stack—focused on building
                  performant, thoughtful user interfaces.
                </p>
                <p className="text-gray-300">
                  My strengths lie in clarity, precision, and growth. I don`t
                  blend economics, accounting, and tech into one concept—but I
                  do believe in the power of being skilled across domains, ready
                  to connect them when needed.
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {[
                    "TypeScript Developer",
                    "React + Next.js Builder",
                    "In-Progress ACCA",
                    "UI/UX Enthusiast",
                    "Charting & Data Viz",
                    "BSc Economics",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-gray-400 hover:text-accent transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      whileHover={{ x: 4 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <span className="text-accent mr-2">{"> "}</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ rotate: 10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" }}
                className="bg-primary/20 p-4 md:p-6 rounded-xl border border-gray-800/50 backdrop-blur-sm w-full overflow-hidden radar-chart-container"
              >
                <div className="relative w-full h-[300px] md:h-[350px]">
                  <Radar
                    data={skillData}
                    options={chartOptions}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 0 2px var(--color-accent)",
                }}
                viewport={{ once: true }}
                className="absolute -bottom-12 -right-12 w-24 h-24 md:-bottom-16 md:-right-16 md:w-32 md:h-32"
              >
                <div
                  className="w-full h-full bg-gray-700 rounded-full overflow-hidden clip-path-circle-40 border-2 border-accent/30 hover:border-accent/60 transition-all"
                  style={{
                    clipPath: "circle(40% at 50% 50%)",
                    backgroundImage: `url(/profile.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 20%",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
