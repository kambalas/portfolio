import { BiLogoNetlify, BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { CgVercel } from "react-icons/cg";
import { DiGithubAlt, DiMongodb, DiJava, DiJira } from "react-icons/di";
import { FaDocker, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaReact, FaVuejs, FaGitAlt, FaGitlab, FaAngular } from "react-icons/fa6";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoFirebase } from "react-icons/io5";
import { SiAntdesign, SiExpress, SiFlask, SiJest, SiNuxtdotjs, SiPassport, SiPostman, SiPythonanywhere, SiSequelize, SiTailwindcss, SiTensorflow, SiSpring, SiDotnet, SiKubernetes, SiMysql, SiSqlite, SiApachecassandra, SiNeo4J, SiJenkins,SiGradle, SiApachemaven, SiCplusplus } from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";

import { TbBrandNextjs, TbBrandGolang, TbBrandCSharp  } from "react-icons/tb";

function Skills() {
  return (
    <section id="skills" className="mx-4 lg:mx-20">
      {/* =========== SKILLS TITLE =========== */}
      <h4 className="text-4xl font-bold text-center mt-20 dark:text-white">
        Technologies I Use.
      </h4>
      {/* =========== LIST OF SKILLS =========== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-8">

        {/* Languages */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <DiJava className="text-2xl" /> Java
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <TbBrandCSharp className="text-2xl" /> C#
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiCplusplus className="text-2xl" /> C++
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <IoLogoJavascript className="text-2xl" /> JavaScript
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <BiLogoTypescript className="text-2xl" /> TypeScript
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaPython className="text-2xl" /> Python
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <TbBrandGolang className="text-2xl" /> GoLang
        </span>

        {/* Web core */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaHtml5 className="text-2xl" /> HTML
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaCss3Alt className="text-2xl" /> CSS
        </span>

        {/* Frameworks */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiSpring className="text-2xl" /> Spring
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiDotnet className="text-2xl" /> .NET
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaAngular className="text-2xl" /> Angular
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaReact className="text-2xl" /> React
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaNodeJs className="text-2xl" /> NodeJS
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiExpress className="text-2xl" /> Express
        </span>

        {/* Databases */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiMysql className="text-2xl" /> MySQL
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiSqlite className="text-2xl" /> SQLite
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <BiLogoPostgresql className="text-2xl" /> PostgreSQL
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <DiMongodb className="text-2xl" /> MongoDB
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiApachecassandra className="text-2xl" /> Cassandra
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiNeo4J className="text-2xl" /> Neo4j
        </span>

        {/* DevOps / Tools */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaDocker className="text-2xl" /> Docker
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiKubernetes className="text-2xl" /> Kubernetes
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiJenkins className="text-2xl" /> Jenkins
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <DiJira className="text-2xl" /> Jira
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <VscAzureDevops className="text-2xl" /> Azure DevOps
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiGradle className="text-2xl" /> Gradle
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <SiApachemaven className="text-2xl" /> Maven
        </span>

        {/* Cloud */}
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaAws className="text-2xl" /> AWS
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <FaMicrosoft className="text-2xl" /> Microsoft Azure
        </span>
        <span className="inline-flex items-center justify-between gap-x-1.5 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-400">
          <IoLogoFirebase className="text-2xl" /> Firebase
        </span>
          </div>
    </section>
  );
}

export default Skills;
