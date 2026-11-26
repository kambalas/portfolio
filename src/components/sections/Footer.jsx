import user_info from '../../data/user_info.js';
import { trackOutbound, trackEmailClick } from '../../lib/analytics';

const linkClass =
  "font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-clay transition-colors duration-300";

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-7">
        <span className="font-mono text-[11px] text-faint">
          © 2026 {user_info.main.name}
        </span>
        <div className="flex flex-wrap gap-6">
          <a
            href={user_info.socials.trimata}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(user_info.socials.trimata, 'Trimata', 'footer')}
            className={linkClass}
          >
            Trimata
          </a>
          <a
            href={user_info.socials.bonder}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(user_info.socials.bonder, 'Bonder', 'footer')}
            className={linkClass}
          >
            Bonder
          </a>
          <a
            href={user_info.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(user_info.socials.github, 'GitHub', 'footer')}
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href={user_info.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(user_info.socials.linkedin, 'LinkedIn', 'footer')}
            className={linkClass}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${user_info.main.email}`}
            onClick={() => trackEmailClick('footer')}
            className={linkClass}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
