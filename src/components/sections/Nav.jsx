import user_info from "../../data/user_info.js";
import ToggleTheme from "../ToggleTheme.jsx";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function Nav({ switchTheme }) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-hairline backdrop-blur-md backdrop-saturate-150"
      style={{ backgroundColor: "color-mix(in srgb, var(--paper) 86%, transparent)" }}
    >
      <div className="wrap flex items-center justify-between py-4">
        {/* Name + sub-label */}
        <a href="#top" className="flex flex-col leading-tight">
          <span className="font-serif text-[20px] font-medium text-ink">
            {user_info.main.name}
          </span>
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {user_info.main.role}
          </span>
        </a>

        {/* Links + actions */}
        <nav className="flex items-center gap-5 sm:gap-7">
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-clay transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="rounded-full bg-clay px-4 py-2.5 text-[13px] font-semibold text-ink hover:bg-clay-hover transition-colors duration-300"
          >
            Book a call →
          </a>

          <ToggleTheme switchTheme={switchTheme} />
        </nav>
      </div>
    </header>
  );
}

export default Nav;
