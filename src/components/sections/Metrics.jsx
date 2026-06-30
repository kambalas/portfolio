import user_info from "../../data/user_info.js";

// Editorial 3-up stat row: big serif clay numbers with vertical hairline
// dividers. Data is unchanged from user_info.metrics.
function Metrics() {
  return (
    <section className="wrap py-14 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {user_info.metrics.map((metric, index) => (
          <div
            key={index}
            className="py-6 sm:py-0 sm:px-10 first:sm:pl-0 last:sm:pr-0
              border-t sm:border-t-0 sm:border-l border-hairline first:border-t-0 first:sm:border-l-0"
          >
            <div className="font-serif text-[58px] sm:text-[62px] leading-none text-clay">
              {metric.value}
            </div>
            <div className="mt-3.5 text-[17px] font-bold text-ink">
              {metric.label}
            </div>
            <p className="mt-1.5 text-[15px] leading-[1.55] text-muted">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Metrics;
