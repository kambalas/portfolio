import user_info from "../../data/user_info.js";
import Project from "../Project.jsx";

function Projects() {
  return (
    <section id="projects" className="mt-8 px-6 lg:px-24">
      {/* =========== SECTION TITLE =========== */}
      <h4 className="text-4xl font-bold text-center mb-10 dark:text-white">
        Projects.
      </h4>

      {/* =========== PROJECTS GRID =========== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {user_info.projects.map((project, index) => (
          <Project
            key={index}
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
