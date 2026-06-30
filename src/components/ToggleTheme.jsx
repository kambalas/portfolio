import { CgDarkMode } from "react-icons/cg";

function ToggleTheme({ switchTheme }) {
  return (
    <button
      onClick={switchTheme}
      className="text-xl text-muted hover:text-clay transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <CgDarkMode />
    </button>
  );
}

export default ToggleTheme;
