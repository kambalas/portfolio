import { VscServerProcess } from 'react-icons/vsc';
import { TbBrowserCheck } from 'react-icons/tb';
import { RiRobot2Line } from 'react-icons/ri';
import { TbMessageChatbot } from 'react-icons/tb';
import { TbZoomCode } from 'react-icons/tb';
import { TbChartBar } from 'react-icons/tb';

const services = [
    {
    icon: <TbMessageChatbot className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
    title: 'AI Customer Chatbots',
    description:
      '24/7 AI chatbots trained on your business data to answer questions instantly, qualify leads, and reduce support workload — without constant manual oversight.',
  },
  {
    icon: <RiRobot2Line className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
    title: 'AI Business Assistants',
    description:
      'Internal AI assistants that search your company knowledge, retrieve accurate information, and help employees make faster decisions — saving hours every week.',
  },
  {
    icon: <TbZoomCode className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
    title: 'AI Workflow Automation',
    description:
      'Automated systems that process documents, extract data, and trigger actions across your tools — eliminating repetitive tasks and reducing costly human errors.',
  },
  {
    icon: <VscServerProcess className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
    title: 'Custom Business Systems',
    description:
      'Secure, scalable systems tailored to your operations. Whether it’s an internal dashboard, admin panel, or full backend platform — built to support growth without breaking as your business scales.',
  },
  {
    icon: <TbBrowserCheck className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
    title: 'Modern Web Applications',
    description:
      'Fast, intuitive web platforms designed for real users. Clean interfaces, strong performance, and seamless user experience — helping you convert visitors into customers and keep teams productive.',
  },
  {
  icon: <TbChartBar className="text-2xl sm:text-3xl text-red-500 dark:text-red-400" />,
  title: 'AI Data & Insights Systems',
  description:
    'Transform your business data into clear dashboards, automated reports, and actionable insights. We build intelligent systems that track performance, detect patterns, and help you make faster, data-driven decisions.',
}
];

function Services() {
  return (
    <section className="px-6 lg:px-24 py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          My Services
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          What I build and how I can help.
        </p>
      </div>

      {/* Cards grid — 1 col → 2 col → 3 col, last row centred */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-gradient-to-br from-zinc-100 to-zinc-200/80 border border-zinc-200/80
              dark:from-zinc-800 dark:to-zinc-800/60 dark:border-zinc-700/50
              hover:-translate-y-1 hover:shadow-lg
              transition-all duration-300 group"
          >
            {/* Icon */}
            <div className="mb-5 inline-flex p-2.5 rounded-xl bg-red-100 dark:bg-red-500/15 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-100">
              {service.title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
