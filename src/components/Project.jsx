import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { trackProjectClick } from '../lib/analytics';

function Project({ title, description, technologies, link, github, image, slug }) {
  const handleDetailsClick = () => trackProjectClick(title, slug);

  return (
    <div
      className="group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-800/50
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300"
    >
      {/* =========== IMAGE / PLACEHOLDER =========== */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800">
        {image ? (
          <img
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full px-6">
            <span className="text-lg font-bold text-zinc-400 dark:text-zinc-500 text-center">
              {title}
            </span>
          </div>
        )}

        {/* =========== HOVER OVERLAY =========== */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/project/${slug}`}
            onClick={handleDetailsClick}
            className="px-5 py-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
              rounded-lg text-sm font-medium
              hover:bg-orange-600 hover:text-white
              transition-colors duration-200
              flex items-center gap-2"
          >
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>

      {/* =========== CARD BODY =========== */}
      <div className="p-5 sm:p-6">
        {/* =========== TECH TAGS =========== */}
        <div className="flex gap-2 flex-wrap mb-4">
          {technologies.split(',').map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium
                bg-orange-100 text-orange-700
                dark:bg-orange-500/20 dark:text-orange-400"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* =========== TITLE =========== */}
        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 line-clamp-2">
          {title}
        </h3>

        {/* =========== DESCRIPTION =========== */}
        <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {description}
        </p>

        {/* =========== ACTION BUTTONS =========== */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium
                text-zinc-600 dark:text-zinc-300
                hover:text-orange-700 dark:hover:text-orange-400
                transition-colors duration-200"
            >
              <FiExternalLink className="text-base" />
              Demo
            </a>
          )}

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium
              text-zinc-600 dark:text-zinc-300
              hover:text-orange-700 dark:hover:text-orange-400
              transition-colors duration-200"
          >
            <FiGithub className="text-base" />
            GitHub
          </a>

          <Link
            to={`/project/${slug}`}
            onClick={handleDetailsClick}
            className="flex items-center gap-1.5 text-sm font-medium ml-auto
              text-orange-700 dark:text-orange-400
              hover:gap-2.5
              transition-all duration-200"
          >
            Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
