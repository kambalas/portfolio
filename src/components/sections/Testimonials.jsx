import user_info from "../../data/user_info.js";
import TestimonialCard from "../TestimonialCard.jsx";

function Testimonials() {
  const reviews = user_info.testimonials;
  const upworkUrl = user_info.socials.upwork;

  return (
    <section id="reviews" className="scroll-mt-20 wrap py-16 md:py-[70px]">
      <div className="text-center mb-11">
        <span className="eyebrow">03 · What clients say</span>
        <h2 className="mt-3.5 font-serif text-[30px] sm:text-[34px] font-normal text-ink">
          Verified 5.0 reviews from real Upwork projects.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {reviews.map((review, index) => (
          <TestimonialCard
            key={index}
            quote={review.quote}
            rating={review.rating}
            project={review.project}
            author={review.author}
            role={review.role}
            source={review.source}
            endorsements={review.endorsements}
          />
        ))}
      </div>

      <div className="text-center mt-9">
        <a
          href={upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper hover:opacity-90 transition-opacity duration-200"
        >
          See all reviews on Upwork →
        </a>
      </div>
    </section>
  );
}

export default Testimonials;
