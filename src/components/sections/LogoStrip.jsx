import user_info from '../../data/user_info.js';

import { DiJava, DiMongodb } from 'react-icons/di';
import { FaDocker, FaNodeJs, FaPython, FaReact, FaAngular } from 'react-icons/fa6';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { BiLogoTypescript, BiLogoPostgresql } from 'react-icons/bi';
import { SiSpring, SiDotnet, SiKubernetes, SiMysql } from 'react-icons/si';
import { TbBrandGolang, TbBrandCSharp } from 'react-icons/tb';

const iconMap = {
  'Java': DiJava,
  'C#': TbBrandCSharp,
  'Go': TbBrandGolang,
  'Python': FaPython,
  'TypeScript': BiLogoTypescript,
  'JavaScript': IoLogoJavascript,
  'React': FaReact,
  'Angular': FaAngular,
  'Spring': SiSpring,
  '.NET': SiDotnet,
  'NodeJS': FaNodeJs,
  'PostgreSQL': BiLogoPostgresql,
  'MongoDB': DiMongodb,
  'MySQL': SiMysql,
  'Docker': FaDocker,
  'Kubernetes': SiKubernetes,
  'AWS': FaAws,
  'Azure': FaMicrosoft,
};

function LogoStrip() {
  const brands = user_info.brands;

  // Duplicate list for seamless infinite loop
  const track = [...brands, ...brands];

  return (
    <section className="py-10 overflow-hidden">
      {/* Fade-edge mask container */}
      <div
        className="relative"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Scrolling track */}
        <div
          className="flex w-max gap-8 sm:gap-12 hover:[animation-play-state:paused]"
          style={{ animation: 'scroll 35s linear infinite' }}
        >
          {track.map((name, index) => {
            const Icon = iconMap[name];
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 flex-shrink-0 px-4 py-2.5 rounded-xl
                  bg-zinc-100 dark:bg-zinc-800/60
                  border border-zinc-200/60 dark:border-zinc-700/40
                  text-zinc-500 dark:text-zinc-400
                  hover:text-orange-600 dark:hover:text-orange-400
                  transition-colors duration-300"
              >
                {Icon && <Icon className="text-xl sm:text-2xl" />}
                <span className="text-sm font-medium whitespace-nowrap">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LogoStrip;
