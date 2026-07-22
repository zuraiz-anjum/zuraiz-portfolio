import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Leadership from "@/components/sections/Leadership";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Leadership />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Contact />
    </>
  );
}
