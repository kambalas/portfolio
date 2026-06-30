import user_info from "../../data/user_info.js";
import Project from "../Project.jsx";

function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 wrap py-16">
      {/* =========== SECTION TITLE =========== */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-11">
        <span className="eyebrow">01 · Selected work</span>
        <h2 className="font-serif text-[30px] sm:text-[34px] font-normal text-ink">
          Projects I have worked with.
        </h2>
      </div>

      {/* =========== ALTERNATING ROWS (order unchanged) =========== */}
      <div>
        {user_info.projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            reverse={index % 2 === 1}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            github={project.github}
            link={project.link}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
