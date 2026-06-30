import user_info from '../../data/user_info.js';

const linkClass =
  "font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-clay transition-colors duration-300";

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-7">
        <span className="font-mono text-[11px] text-faint">
          © 2026 {user_info.main.name}
        </span>
        <div className="flex gap-6">
          <a
            href={user_info.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href={user_info.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <a href={`mailto:${user_info.main.email}`} className={linkClass}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
