import { CgDarkMode } from "react-icons/cg";

function ToggleTheme({ switchTheme }) {
  return (
    /* p-3 + negative margin: 44px touch target without moving anything */
    <button
      onClick={switchTheme}
      className="text-xl text-muted hover:text-clay transition-colors duration-300 p-3 -m-3"
      aria-label="Toggle dark mode"
    >
      <CgDarkMode />
    </button>
  );
}

export default ToggleTheme;
