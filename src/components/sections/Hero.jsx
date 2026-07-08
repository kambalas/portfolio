import user_info from "../../data/user_info.js";

// Dark "warm ink" band with the photo on the left and positioning copy on the
// right. Copy comes straight from user_info (unchanged data).
function Hero() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#2a241f] text-[#fff1e6]">
      <div className="wrap grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr] gap-10 md:gap-14 items-center py-14 md:py-16">
        {/* Photo */}
        <div>
          <img
            src={`${import.meta.env.BASE_URL}${user_info.main.photo}`}
            alt={user_info.main.name}
            width="510"
            height="557"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto max-w-[320px] md:max-w-none rounded-2xl"
          />
          <p className="mt-3 font-mono text-[10px] text-[#cdbdac]">
            {user_info.main.name}
          </p>
        </div>

        {/* Copy */}
        <div>
          <h1 className="font-serif text-[40px] sm:text-[46px] lg:text-[50px] font-normal leading-[1.08] text-[#fff1e6]">
            {user_info.main.role}
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18px] leading-[1.6] text-[#cdbdac]">
            {user_info.main.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="rounded-full bg-[#ddbea9] px-7 py-3.5 text-[15px] font-bold text-[#2a241f] hover:bg-[#e8cdb9] transition-colors duration-300"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="text-[15px] font-semibold text-[#fff1e6] border-b-2 border-[#ddbea9] pb-0.5 hover:text-[#ddbea9] transition-colors duration-300"
            >
              See selected work →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
