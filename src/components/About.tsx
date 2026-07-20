import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const stats = [
  { value: "3+", label: "Years building frontend experiences" },
  { value: "12+", label: "Delivered product interfaces" },
  { value: "7+", label: "Core tools mastered" },
  { value: "100%", label: "User-focused execution" },
];

const strengths = [
  "Accessible, responsive interfaces crafted for real-world users.",
  "Clean TypeScript architecture that stays easy to maintain and extend.",
  "Performance-first delivery with fast load times and fluid interactions.",
  "Close collaboration with product and design teams to align on vision.",
];

export function About() {
  return (
    <AnimatedSection
      id="about"
      delay={80}
      className="border-t border-border bg-surface/30 px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <SectionHeader
            label="About"
            title="About"
            gradientWord="Me"
            description="I build polished, accessible web applications with modern frontend tools, thoughtful UX, and a strong focus on performance and collaboration."
            centered
          />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr] xl:items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-background/90 p-8 shadow-sm">
              <p className="text-base leading-relaxed text-foreground/90">
                I’m a frontend developer who turns product ideas into fast,
                intuitive web experiences. I specialize in React, Next.js,
                TypeScript, and Tailwind CSS to build interfaces that feel
                polished and behave reliably across devices.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                My work is driven by clarity — from component architecture to
                accessible layouts and performance tweaks. I enjoy working with
                product and design teams to create solutions that are both
                beautiful and dependable.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                Whether I’m refining a landing page, optimizing a UI, or
                shipping a full-featured web app, the goal is the same: make
                every interaction feel effortless for the people who use it.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-border bg-surface/80 p-6 text-center shadow-sm"
                >
                  <p className="text-3xl font-semibold text-foreground">
                    {value}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.24em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-background/90 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                What I bring to the table
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                {strengths.map((strength) => (
                  <li key={strength} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface/80 p-6 text-sm leading-relaxed text-foreground shadow-sm">
              <p className="font-semibold text-foreground">
                Ready to build memorable frontend experiences?
              </p>
              <p className="mt-3 text-muted">
                I’m always looking for projects where thoughtful design and
                solid engineering come together. Let’s collaborate on a fast,
                usable product that your users will enjoy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
