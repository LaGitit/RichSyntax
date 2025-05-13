import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Projects from "@/app/components/Projects";
import Certificates from "@/app/components/Certificates";
import SyntaxLab from "@/app/components/SyntaxLab/SyntaxLab";
import Contact from "@/app/components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <SyntaxLab />
    </div>
  );
}
