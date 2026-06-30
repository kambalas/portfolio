import { Layers, Sparkles, AppWindow } from "lucide-react";

// Three focused service themes. Titles, descriptions and tech pills are
// unchanged data; restyled into the warm editorial card with a line-icon chip.
const services = [
  {
    icon: Layers,
    title: "AI Agents",
    description:
      "Autonomous agents that reason over multiple steps, call your tools and APIs, and act on your own business data. RAG-grounded retrieval keeps answers accurate, with human handoff when a decision needs a person.",
    stack: ["Python", "FastAPI", "OpenAI", "pgvector", "Supabase"],
  },
  {
    icon: Sparkles,
    title: "AI Workflow Automation",
    description:
      "Automated pipelines that process documents, extract structured data from messy sources, and trigger actions across your existing tools, removing repetitive manual work.",
    stack: ["Python", "n8n", "Crawl4AI", "OpenAI", "WhatsApp API"],
  },
  {
    icon: AppWindow,
    title: "Full-Stack AI Web Applications",
    description:
      "Production web apps built end to end: fast, responsive interfaces wired to AI-powered backends, with the same engineering rigor I bring to client work.",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "Supabase"],
  },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-band">
      <div className="wrap py-16">
        <span className="eyebrow">02 · Services delivered</span>
        <h2 className="mt-3.5 mb-10 font-serif text-[30px] sm:text-[34px] font-normal text-ink">
          How I can help.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-hairline bg-surface p-8
                  hover:border-clay transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="flex items-center justify-center w-[46px] h-[46px] rounded-xl text-clay"
                    style={{ background: "color-mix(in srgb, var(--clay) 12%, transparent)" }}
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span className="font-serif italic text-[22px] text-faint">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-[21px] font-medium text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">
                  {service.description}
                </p>

                {/* Tech pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-mono text-[11px] font-medium text-clay rounded-full px-2.5 py-1"
                      style={{ background: "color-mix(in srgb, var(--clay) 10%, transparent)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
