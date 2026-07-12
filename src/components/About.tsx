import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const stats = [
  { value: "3+", label: "Years Learning" },
  { value: "5+", label: "Projects Built" },
  { value: "7+", label: "Technologies" },
  { value: "100%", label: "Passion" },
];

export function About() {
  return (
    <AnimatedSection id="about" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader
            label="About Me"
            title="Crafting"
            gradientWord="Digital Experiences"
          />
        </div>

        {/* ── Stats Row ──────────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="glass group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_4px_30px_rgba(99,102,241,0.1)]"
              style={{ perspective: "600px" }}
            >
              <p className="text-gradient text-3xl font-bold">{value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Text Blocks ─────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="relative space-y-5 rounded-2xl border border-border bg-surface/50 p-7 text-base leading-relaxed text-muted backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_30px_rgba(99,102,241,0.07)]">
            <span className="absolute left-0 top-6 h-12 w-1 rounded-r-full bg-gradient-to-b from-accent to-accent-secondary" />
            <p className="pl-2">
              I&apos;m a passionate frontend developer who loves turning ideas
              into beautiful, functional web experiences. My focus is on writing
              clean, maintainable code and building interfaces that feel
              intuitive on every device.
            </p>
            <p className="pl-2">
              I specialize in creating responsive websites with modern
              technologies like React, Next.js, and TypeScript. I&apos;m
              constantly exploring new tools and best practices to stay at the
              forefront of web development.
            </p>
          </div>

          <div className="relative space-y-5 rounded-2xl border border-border bg-surface/50 p-7 text-base leading-relaxed text-muted backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_30px_rgba(99,102,241,0.07)]">
            <span className="absolute left-0 top-6 h-12 w-1 rounded-r-full bg-gradient-to-b from-accent-secondary to-accent" />
            <p className="pl-2">
              User experience is at the heart of everything I build. From
              thoughtful micro-interactions to performance-optimized layouts, I
              strive to deliver applications that are both visually polished and
              a joy to use.
            </p>
            <p className="pl-2">
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
