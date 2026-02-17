import user_info from '../../data/user_info.js';
import { GoProjectRoadmap } from 'react-icons/go';
import { BsBriefcase } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';

const iconMap = {
  0: <GoProjectRoadmap className="text-2xl sm:text-3xl text-orange-400" />,
  1: <BsBriefcase className="text-2xl sm:text-3xl text-orange-400" />,
  2: <FiUsers className="text-2xl sm:text-3xl text-orange-400" />,
};

function Metrics() {
  return (
    <section className="px-6 lg:px-24 pb-16 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {user_info.metrics.map((metric, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8
              bg-gradient-to-br from-zinc-100 to-zinc-200/80 border border-zinc-200/80
              dark:from-zinc-800 dark:to-zinc-800/60 dark:border-zinc-700/50
              hover:-translate-y-1 hover:shadow-lg
              transition-all duration-300 group"
          >
            {/* Icon + Value row */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-500/15 group-hover:scale-110 transition-transform duration-300">
                {iconMap[index]}
              </div>
              <span className="text-4xl sm:text-5xl font-black text-orange-600/20 dark:text-orange-400/20 leading-none select-none">
                {metric.value}
              </span>
            </div>

            {/* Label */}
            <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-100">
              {metric.label}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Metrics;
