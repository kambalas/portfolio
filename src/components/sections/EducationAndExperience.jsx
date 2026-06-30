import user_info from "../../data/user_info.js";

function TimelineEntry({ duration, logo, title, subtitle, descriptions }) {
  return (
    <div className="relative">
      <span className="absolute -left-[31px] top-[6px] w-[9px] h-[9px] rounded-full bg-clay" />
      <div className="font-mono text-[11px] text-faint mb-2">{duration}</div>
      <div className="flex items-center gap-3 mb-2.5">
        <img
          src={`${import.meta.env.BASE_URL}${logo}`}
          alt={title}
          className="w-9 h-9 rounded-lg object-contain bg-white p-[3px]"
        />
        <div className="leading-tight">
          <div className="font-bold text-[17px] text-ink">{title}</div>
          <div className="text-[14px] text-muted">{subtitle}</div>
        </div>
      </div>
      {descriptions && (
        <ul className="list-disc pl-5 text-[14.5px] leading-[1.6] text-muted space-y-1">
          {descriptions.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EducationAndExperience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-band">
      <div className="wrap py-16">
        <span className="eyebrow">04 · Background</span>
        <h2 className="mt-3.5 mb-11 font-serif text-[30px] sm:text-[34px] font-normal text-ink">
          Education &amp; experience.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-12 md:gap-14">
          {/* Education */}
          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint mb-7">
              Education
            </h3>
            <div className="flex flex-col gap-8 border-l border-hairline pl-7">
              {user_info.education.map((edu, index) => (
                <TimelineEntry
                  key={index}
                  duration={edu.duration}
                  logo={edu.image}
                  title={edu.school}
                  subtitle={edu.degree}
                />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint mb-7">
              Experience
            </h3>
            <div className="flex flex-col gap-9 border-l border-hairline pl-7">
              {user_info.experience.map((exp, index) => (
                <TimelineEntry
                  key={index}
                  duration={exp.duration}
                  logo={exp.image}
                  title={exp.company}
                  subtitle={exp.position}
                  descriptions={exp.descriptions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationAndExperience;
