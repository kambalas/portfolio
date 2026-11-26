import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import user_info from '../data/user_info.js';
import { FiArrowLeft, FiExternalLink, FiGithub, FiSmartphone } from 'react-icons/fi';
import { trackProjectLink, trackBackToProjects } from '../lib/analytics';
import { useScrollDepth } from '../hooks/useScrollDepth';
import { usePageEngagement } from '../hooks/usePageEngagement';
import { useInteractionQuality } from '../hooks/useInteractionQuality';

// Intrinsic pixel sizes of the project screenshots. Reserving the space up
// front prevents the layout from jumping while the image loads. New images
// default to 1200x676 (the common 16:9-ish export size used here).
const IMAGE_DIMENSIONS = {
  'projects/business-website.webp': { width: 1200, height: 730 },
  'projects/chatbot.webp': { width: 1200, height: 800 },
  'projects/bonder.webp': { width: 1200, height: 800 },
  'projects/trimata.webp': { width: 1200, height: 800 },
};
const DEFAULT_DIMENSIONS = { width: 1200, height: 676 };

function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = user_info.projects.find((p) => p.slug === slug);

  // Hooks must run before the not-found early return below.
  // Note: on lg+ this page uses inner scroll containers rather than the
  // window, so scroll depth here is a mobile/narrow-viewport signal.
  const maxScrollRef = useScrollDepth(slug);
  const currentSectionRef = useRef(`project:${slug}`);
  currentSectionRef.current = `project:${slug}`;
  usePageEngagement({ maxScrollRef, currentSectionRef, resetKey: slug });
  useInteractionQuality(currentSectionRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // =========== NOT FOUND ===========
  if (!project) {
    return (
      <div className="bg-paper text-ink min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <h1 className="font-serif text-4xl font-normal text-ink">Project not found</h1>
          <p className="mt-4 text-muted">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 rounded-full bg-clay hover:bg-clay-hover px-6 py-3 text-clayink font-semibold transition-colors duration-200"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  const techList = project.technologies.split(',').map((t) => t.trim());
  const features = project.features || [];
  const useCases = project.useCases || [];

  return (
    <div className="bg-paper text-ink min-h-screen lg:h-screen lg:overflow-hidden">
      <div className="wrap lg:h-full flex flex-col">

        {/* ── TOP BAR ── */}
        <div className="pt-8 pb-2 shrink-0">
          <button
            onClick={() => {
              trackBackToProjects();
              navigate('/#projects');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-clay transition-colors duration-200"
          >
            <FiArrowLeft className="text-base" />
            Back to Projects
          </button>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="flex-1 flex lg:items-center lg:overflow-hidden py-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">

            {/* ════ LEFT COLUMN ════ */}
            <div className="flex flex-col lg:overflow-y-auto lg:pr-2 lg:max-h-[calc(100vh-8rem)]">

              {/* Title */}
              <div>
                <h1 className="font-serif text-[34px] sm:text-[44px] font-normal leading-tight text-ink">
                  {project.title}
                </h1>
                <p className="mt-4 text-[16px] leading-[1.7] text-muted">
                  {project.details || project.description}
                </p>
              </div>

              {/* Verified numbers */}
              {project.stats && (
                <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-serif text-[34px] leading-none text-clay">{stat.value}</dd>
                      <dd className="mt-1.5 text-[13px] text-muted">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Technologies */}
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center py-1.5 px-3 rounded-full text-xs font-semibold text-clay"
                      style={{ background: "color-mix(in srgb, var(--clay) 12%, transparent)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features list */}
              {features.length > 0 && (
                <div className="mt-9">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2.5">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg
                          className="flex-shrink-0 w-4 h-4 mt-0.5 text-clay"
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
                        <span className="text-sm text-muted leading-relaxed">
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
                <div className="rounded-2xl overflow-hidden border border-hairline shrink-0">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image}`}
                    alt={project.title}
                    width={(IMAGE_DIMENSIONS[project.image] || DEFAULT_DIMENSIONS).width}
                    height={(IMAGE_DIMENSIONS[project.image] || DEFAULT_DIMENSIONS).height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProjectLink('demo', project.title, project.link, 'project_detail')}
                    className="inline-flex items-center gap-2 rounded-full bg-clay hover:bg-clay-hover px-6 py-3 text-clayink font-semibold text-sm transition-colors duration-200"
                  >
                    <FiExternalLink />
                    {project.slug === 'bonder' || project.slug === 'trimata' ? 'Visit site' : 'Live Demo'}
                  </a>
                )}
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProjectLink('app_store', project.title, project.appStore, 'project_detail')}
                    className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-ink hover:border-clay hover:text-clay font-semibold text-sm transition-colors duration-200"
                  >
                    <FiSmartphone />
                    iOS app on the App Store
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProjectLink('github', project.title, project.github, 'project_detail')}
                    className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-ink hover:border-clay hover:text-clay font-semibold text-sm transition-colors duration-200"
                  >
                    <FiGithub />
                    View on GitHub
                  </a>
                )}
              </div>

              {/* Use Cases */}
              {useCases.length > 0 && (
                <div className="mt-8 rounded-2xl border border-hairline bg-surface p-6 flex flex-col gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Use Cases
                  </p>
                  <ul className="flex flex-col gap-3.5">
                    {useCases.map((uc, i) => (
                      <li key={i} className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-ink">
                          {uc.title}
                        </span>
                        <span className="text-[13px] text-muted leading-relaxed">
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
