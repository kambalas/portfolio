import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { DiMongodb, DiJava, DiJira } from "react-icons/di";
import { FaDocker, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaReact, FaAngular } from "react-icons/fa6";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoFirebase } from "react-icons/io5";
import { SiExpress, SiTailwindcss, SiSpring, SiDotnet, SiKubernetes, SiMysql, SiSqlite, SiApachecassandra, SiNeo4J, SiJenkins, SiGradle, SiApachemaven, SiCplusplus } from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { TbBrandGolang, TbBrandCSharp } from "react-icons/tb";

const sections = [
  {
    title: 'Languages',
    description: 'The programming languages I reach for across backend, scripting, and systems work.',
    skills: [
      { icon: <DiJava />, name: 'Java' },
      { icon: <TbBrandCSharp />, name: 'C#' },
      { icon: <SiCplusplus />, name: 'C++' },
      { icon: <IoLogoJavascript />, name: 'JavaScript' },
      { icon: <BiLogoTypescript />, name: 'TypeScript' },
      { icon: <FaPython />, name: 'Python' },
      { icon: <TbBrandGolang />, name: 'GoLang' },
    ],
  },
  {
    title: 'Frontend',
    description: 'Tools and frameworks for building responsive, modern user interfaces.',
    skills: [
      { icon: <FaHtml5 />, name: 'HTML' },
      { icon: <FaCss3Alt />, name: 'CSS' },
      { icon: <FaReact />, name: 'React' },
      { icon: <FaAngular />, name: 'Angular' },
      { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Backend & Frameworks',
    description: 'Server-side runtimes and frameworks for APIs, microservices, and data pipelines.',
    skills: [
      { icon: <SiSpring />, name: 'Spring' },
      { icon: <SiDotnet />, name: '.NET' },
      { icon: <FaNodeJs />, name: 'NodeJS' },
      { icon: <SiExpress />, name: 'Express' },
    ],
  },
  {
    title: 'Databases',
    description: 'Relational, document, and graph stores for structured and unstructured data.',
    skills: [
      { icon: <SiMysql />, name: 'MySQL' },
      { icon: <SiSqlite />, name: 'SQLite' },
      { icon: <BiLogoPostgresql />, name: 'PostgreSQL' },
      { icon: <DiMongodb />, name: 'MongoDB' },
      { icon: <SiApachecassandra />, name: 'Cassandra' },
      { icon: <SiNeo4J />, name: 'Neo4j' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Infrastructure, CI/CD pipelines, and cloud platforms for reliable delivery.',
    skills: [
      { icon: <FaDocker />, name: 'Docker' },
      { icon: <SiKubernetes />, name: 'Kubernetes' },
      { icon: <SiJenkins />, name: 'Jenkins' },
      { icon: <FaAws />, name: 'AWS' },
      { icon: <FaMicrosoft />, name: 'Azure' },
      { icon: <IoLogoFirebase />, name: 'Firebase' },
      { icon: <VscAzureDevops />, name: 'Azure DevOps' },
      { icon: <SiGradle />, name: 'Gradle' },
      { icon: <SiApachemaven />, name: 'Maven' },
      { icon: <DiJira />, name: 'Jira' },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="px-6 lg:px-24 py-16 space-y-14">
      {/* Section heading */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Technologies I Use
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Languages, frameworks, and tools across the full stack.
        </p>
      </div>
      {sections.map((section, si) => (
        <div key={si}>
          {/* Section header */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {section.description}
            </p>
            <div className="mt-3 h-px w-16 bg-red-500/60 dark:bg-red-400/60 rounded-full" />
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {section.skills.map((skill, ki) => (
              <div
                key={ki}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl
                  bg-orange-50 border border-orange-100
                  dark:bg-orange-500/10 dark:border-orange-500/20
                  hover:-translate-y-1 hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500/40
                  transition-all duration-300 group cursor-default aspect-square"
              >
                <span className="text-3xl text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400 text-center leading-tight">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;
