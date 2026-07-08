import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import user_info from "../../data/user_info.js";
import ToggleTheme from "../ToggleTheme.jsx";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function Nav({ switchTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-hairline backdrop-blur-md backdrop-saturate-150"
      style={{
        backgroundColor: "color-mix(in srgb, var(--paper) 86%, transparent)",
        // Own compositor layer: the backdrop blur re-renders on its own
        // layer instead of forcing repaints of the page behind it on scroll.
        transform: "translateZ(0)",
      }}
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
        <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-7">
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
            className="rounded-full bg-clay px-4 py-2.5 text-[13px] font-semibold text-clayink hover:bg-clay-hover transition-colors duration-300"
          >
            Book a call →
          </a>

          <ToggleTheme switchTheme={switchTheme} />

          {/* Mobile menu toggle (44px hit area via padding + negative margin) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-xl text-muted hover:text-clay transition-colors duration-300 p-3 -m-3"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </div>

      {/* Mobile menu panel: same mono link style as the desktop nav.
          Kept mounted (hidden) so aria-controls always resolves. */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
        className="md:hidden border-t border-hairline"
      >
        <div className="wrap flex flex-col py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-clay transition-colors duration-300 border-b border-hairline last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
