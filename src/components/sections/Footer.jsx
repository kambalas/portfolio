import user_info from '../../data/user_info.js';
import GitHubButton from 'react-github-btn';
import { FaArrowCircleUp } from 'react-icons/fa';

function Footer({ theme }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="p-4 text-center md:flex justify-between">
      {/* =========== GITHUB BUTTON =========== */}
      <GitHubButton
        className="self-center"
        href="https://github.com/kambalas"
        data-color-scheme={theme}
        data-size="large"
        aria-label="Follow me on GitHub"
      >
        Let’s connect on GitHub
      </GitHubButton>
      {/* =========== SCROLL ON TOP BUTTON =========== */}
      <button
        onClick={() => scrollToTop()}
        className="text-zinc-600 self-center mt-2 md:mt-0 dark:text-zinc-300 mx-auto md:mx-0 text-sm font-light flex gap-2"
      >
        <FaArrowCircleUp className="self-center text-orange-700 dark:text-orange-400" />{' '}
        Go back to top
      </button>
    </footer>
  );
}

export default Footer;
