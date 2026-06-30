import user_info from "../../data/user_info.js";

// Dark "warm ink" band with the photo on the left and positioning copy on the
// right. Copy comes straight from user_info (unchanged data).
function Hero() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#463f3a] text-[#f4f3ee]">
      <div className="wrap grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr] gap-10 md:gap-14 items-center py-14 md:py-16">
        {/* Photo */}
        <div>
          <img
            src={`${import.meta.env.BASE_URL}${user_info.main.photo}`}
            alt={user_info.main.name}
            className="w-full max-w-[320px] md:max-w-none rounded-2xl"
          />
          <p className="mt-3 font-mono text-[10px] text-[#bcb8b1]">
            {user_info.main.name}
          </p>
        </div>

        {/* Copy */}
        <div>
          <h1 className="font-serif text-[40px] sm:text-[46px] lg:text-[50px] font-normal leading-[1.08] text-[#f4f3ee]">
            {user_info.main.role}
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18px] leading-[1.6] text-[#bcb8b1]">
            {user_info.main.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="rounded-full bg-[#e0afa0] px-7 py-3.5 text-[15px] font-bold text-[#463f3a] hover:bg-[#ecc0b3] transition-colors duration-300"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="text-[15px] font-semibold text-[#f4f3ee] border-b-2 border-[#e0afa0] pb-0.5 hover:text-[#e0afa0] transition-colors duration-300"
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
