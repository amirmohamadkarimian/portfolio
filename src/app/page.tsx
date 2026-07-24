import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

/* ── Lazy-load below-the-fold sections to reduce initial JS payload ──── */
const Highlights = dynamic(() =>
  import("@/components/Highlights").then((m) => m.Highlights),
);
const Skills = dynamic(() =>
  import("@/components/Skills").then((m) => m.Skills),
);
const Projects = dynamic(() =>
  import("@/components/Projects").then((m) => m.Projects),
);
const Experience = dynamic(() =>
  import("@/components/Experience").then((m) => m.Experience),
);
const Contact = dynamic(() =>
  import("@/components/Contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
