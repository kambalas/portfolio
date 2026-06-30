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
    <section id="skills" className="scroll-mt-20 wrap py-16">
      {/* Section heading */}
      <span className="eyebrow">05 · Toolkit</span>
      <h2 className="mt-3.5 font-serif text-[30px] sm:text-[34px] font-normal text-ink">
        Technologies I use.
      </h2>
      <p className="mt-1 mb-10 text-[17px] text-muted">
        Languages, frameworks, and tools across the full stack.
      </p>

      <div className="flex flex-col gap-8">
        {sections.map((section, si) => (
          <div
            key={si}
            className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-5 md:gap-8 items-start border-t border-hairline pt-7"
          >
            {/* Left: title + description */}
            <div>
              <h3 className="font-serif text-[20px] font-medium text-ink">
                {section.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-faint">
                {section.description}
              </p>
            </div>

            {/* Right: skill pills with icons */}
            <div className="flex flex-wrap gap-2.5">
              {section.skills.map((skill, ki) => (
                <span
                  key={ki}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3.5 py-[7px]
                    text-[13px] font-medium text-ink hover:border-clay hover:text-clay transition-colors duration-200"
                >
                  <span className="text-[15px] text-muted">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
