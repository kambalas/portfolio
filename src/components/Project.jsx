import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { trackProjectClick } from '../lib/analytics';

// Editorial two-column row. Image and text swap sides on alternating rows
// (controlled by `reverse`). Data is unchanged from user_info.
function Project({ title, description, technologies, link, github, image, slug, index, reverse }) {
  const handleDetailsClick = () => trackProjectClick(title, slug);
  const number = String(index + 1).padStart(2, '0');

  // Serve the 600px variant to small screens (half the bytes, same look).
  // When adding a new project image, generate its -600.webp variant too:
  //   cwebp -resize 600 0 -q 80 projects/name.webp -o projects/name-600.webp
  const image600 = image?.endsWith('.webp')
    ? image.replace(/\.webp$/, '-600.webp')
    : null;
  const srcSet = image600
    ? `${import.meta.env.BASE_URL}${image600} 600w, ${import.meta.env.BASE_URL}${image} 1200w`
    : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-9 border-t border-hairline last:border-b">
      {/* =========== IMAGE =========== */}
      <div className={`group relative rounded-xl overflow-hidden border border-hairline ${reverse ? 'md:order-2' : ''}`}>
        <div className="relative aspect-[3/2] overflow-hidden bg-band">
          {image ? (
            <img
              src={`${import.meta.env.BASE_URL}${image}`}
              srcSet={srcSet}
              sizes="(min-width: 768px) 540px, calc(100vw - 48px)"
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex items-center justify-center h-full px-6">
              <span className="font-serif text-lg text-faint text-center">{title}</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#2a241f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              to={`/project/${slug}`}
              onClick={handleDetailsClick}
              className="px-5 py-2.5 rounded-full bg-[#fff1e6] text-[#2a241f] text-sm font-semibold
                hover:bg-[#ddbea9] hover:text-[#2a241f] transition-colors duration-200 flex items-center gap-2"
            >
              View Details <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* =========== TEXT =========== */}
      <div className={reverse ? 'md:order-1' : ''}>
        <span className="font-mono text-[11px] text-clay">{number} · Selected work</span>

        <h3 className="mt-2.5 font-serif text-[26px] sm:text-[29px] font-medium text-ink leading-snug">
          {title}
        </h3>

        <p className="mt-3 text-[16px] leading-[1.6] text-muted">
          {description}
        </p>

        <p className="mt-4 font-mono text-[11px] text-faint">
          {technologies.split(',').map((t) => t.trim()).join(' · ')}
        </p>

        {/* Links */}
        <div className="flex items-center gap-5 mt-5">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-clay transition-colors duration-200"
            >
              <FiExternalLink className="text-base" />
              Demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-clay transition-colors duration-200"
            >
              <FiGithub className="text-base" />
              GitHub
            </a>
          )}
          <Link
            to={`/project/${slug}`}
            onClick={handleDetailsClick}
            className="flex items-center gap-1.5 text-sm font-semibold text-clay hover:gap-2.5 transition-all duration-200"
          >
            Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
