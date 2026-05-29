import { AnimatedSection } from "./AnimatedSection";

export function About() {
  return (
    <AnimatedSection id="about" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            About Me
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Crafting Digital Experiences
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a passionate frontend developer who loves turning ideas
              into beautiful, functional web experiences. My focus is on writing
              clean, maintainable code and building interfaces that feel
              intuitive on every device.
            </p>
            <p>
              I specialize in creating responsive websites with modern
              technologies like React, Next.js, and TypeScript. I&apos;m
              constantly exploring new tools and best practices to stay at the
              forefront of web development.
            </p>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>
              User experience is at the heart of everything I build. From
              thoughtful micro-interactions to performance-optimized layouts, I
              strive to deliver applications that are both visually polished and
              a joy to use.
            </p>
            <p>
              Whether it&apos;s a personal project or a production application,
              I approach every challenge with curiosity, attention to detail,
              and a commitment to continuous improvement.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
