import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import user_info from '../data/user_info.js';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';

function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = user_info.projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // =========== NOT FOUND ===========
  if (!project) {
    return (
      <div className="bg-zinc-100 dark:bg-zinc-800 min-h-screen">
        <div className="xl:w-[1200px] md:mx-auto h-full border-x border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100">Project not found</h1>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              The project you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-3 bg-red-800 hover:bg-red-700 text-white rounded-xl transition-colors duration-200"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  const techList = project.technologies.split(',').map((t) => t.trim());
  const features = project.features || [];
  const useCases = project.useCases || [];

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 lg:h-screen lg:overflow-hidden">
      <div className="xl:w-[1200px] md:mx-auto lg:h-full flex flex-col border-x border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">

        {/* ── TOP BAR ── */}
        <div className="px-6 lg:px-24 pt-8 pb-2 shrink-0">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium
              text-zinc-500 dark:text-zinc-400
              hover:text-red-800 dark:hover:text-red-400
              transition-colors duration-200"
          >
            <FiArrowLeft className="text-base" />
            Back to Projects
          </button>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="flex-1 flex lg:items-center lg:overflow-hidden px-6 lg:px-24 py-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">

          {/* ════ LEFT COLUMN ════ */}
          <div className="flex flex-col lg:overflow-y-auto lg:pr-2 lg:max-h-[calc(100vh-8rem)]">

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                {project.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {project.details || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center py-1.5 px-3 rounded-full text-xs font-medium
                      bg-orange-100 text-orange-700
                      dark:bg-orange-500/20 dark:text-orange-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features list */}
            {features.length > 0 && (
              <div className="mt-10">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                  Key Features
                </p>
                <ul className="space-y-2.5">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 text-red-700 dark:text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div className="flex flex-col lg:overflow-y-auto lg:max-h-[calc(100vh-8rem)]">

            {/* Image card */}
            {project.image && (
              <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 shadow-lg shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}${project.image}`}
                  alt={project.title}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-3 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3
                    bg-red-800 hover:bg-red-700 text-white
                    rounded-xl font-medium text-sm transition-colors duration-200"
                >
                  <FiExternalLink />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3
                    border border-zinc-300 dark:border-zinc-700
                    text-zinc-700 dark:text-zinc-300
                    hover:border-red-800 hover:text-red-800
                    dark:hover:border-red-400 dark:hover:text-red-400
                    rounded-xl font-medium text-sm transition-colors duration-200"
                >
                  <FiGithub />
                  View on GitHub
                </a>
              )}
            </div>

            {/* Use Cases */}
            {useCases.length > 0 && (
              <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-5 flex flex-col gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Use Cases
                </p>
                <ul className="flex flex-col gap-3">
                  {useCases.map((uc, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                        {uc.title}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {uc.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
