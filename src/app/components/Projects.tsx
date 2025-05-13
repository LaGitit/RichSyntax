"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiLock } from "react-icons/fi";

type Project = {
  title: string;
  description: string;
  insight: string;
  tags: string[];
  thumbnail: string;
  links: {
    github?: string;
    live?: string;
  };
  comingSoon?: boolean;
  status: "completed" | "wip" | "archived";
  year: number;
};

export default function Projects() {
  const projects: Project[] = [
    {
      title: "ExoQuest",
      description:
        "A visually rich and immersive space tour experience built with React. Users can explore planets and space missions through interactive animations.",
      insight:
        "Focused on delivering an engaging frontend experience using data-driven visuals and smooth transitions.",
      tags: ["React", "Framer Motion", "Space UI"],
      thumbnail: "/exoquest-preview.gif",
      links: {
        github: "https://github.com/lagitit/exoquest",
        live: "https://lagitit.github.io/ExoQuest/",
      },
      year: 2025,
      status: "completed",
    },
    {
      title: "Project Stuttgart",
      description:
        "A Porsche-themed landing page inspired by the Turbo GT — designed to reflect luxury, speed, and brand personality through motion and minimalism.",
      insight:
        "Prioritized layout balance and responsive motion to evoke premium branding without overloading the interface.",
      tags: ["React", "GSAP"],
      thumbnail: "/stuttgart-arch.svg",
      links: {
        github: "https://github.com/lagitit/project-stuttgart",
        live: "https://lagitit.github.io/project-stuttgart/",
      },
      year: 2025,
      status: "completed",
    },
    {
      title: "Bullshift.app",
      description: "AI-powered corporate jargon detector (WIP)",
      insight: "Coming soon - patent pending architecture",
      tags: ["Expo", "Android", "TypeScript"],
      thumbnail: "",
      links: {},
      comingSoon: true,
      year: 2025,
      status: "wip",
    },
  ];

  return (
    <section id="projects" className="relative py-28 px-4 max-w-7xl mx-auto">
      <motion.div className="mb-20">
        <motion.h2
          className="text-4xl font-orbitron mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <span className="font-mono text-accent mr-2">{"//"}</span>
          Featured Projects
        </motion.h2>
        <motion.div
          className="h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 w-1/2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);

    rotateX.set((e.clientY - top - height / 2) / 25);
    rotateY.set(-(e.clientX - left - width / 2) / 25);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(77, 181, 255, 0.1), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="relative group h-full project-card"
      role="button"
      aria-label={`View details of ${project.title}`}
      tabIndex={0}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          background,
          transition: "transform 0.15s ease-out",
        }}
        whileHover={{ scale: 1.02 }}
        className="h-full bg-primary/20 border border-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            {project.comingSoon ? (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-4xl text-accent"
                >
                  <FiLock />
                </motion.div>
              </div>
            ) : (
              <>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  unoptimized={project.thumbnail.endsWith(".gif")}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  placeholder="blur"
                  blurDataURL={
                    project.thumbnail.includes(".gif")
                      ? "/placeholder-gif.webp"
                      : "/placeholder-svg.webp"
                  }
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              </>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-orbitron">{project.title}</h3>
                <span className="text-xs text-gray-500">{project.year}</span>
              </div>

              <p className="text-gray-400 text-sm mb-3">
                {project.description}
              </p>

              {/* Key insight */}
              <motion.div className="mb-4" whileHover={{ x: 5 }}>
                <p className="text-accent text-sm font-medium">
                  {project.insight}
                </p>
                <motion.div
                  className="h-px bg-accent/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>

            {/* Tags and Status */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-primary/50 rounded-md border border-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.status === "wip" && (
                <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-400/20 w-fit">
                  Under Development
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-auto">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <FiGithub size={20} />
                </motion.a>
              )}

              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={`Live demo of ${project.title}`}
                >
                  <FiExternalLink size={20} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dual Glow Effects */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(77, 181, 255, 0.1), transparent 80%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.2, 0],
          transition: { repeat: Infinity, duration: 3 },
        }}
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(77, 181, 255, 0.15), transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
