// Reusable review card in the warm editorial system: clay star rating, serif
// quote, accent-tinted endorsement pills, and a footer with the reviewer's
// name/role plus a green "Verified on Upwork" tick for Upwork reviews.
function TestimonialCard({
  quote,
  rating,
  project,
  author,
  role,
  source = 'upwork',
  endorsements = [],
}) {
  const subtitle = role || project;

  return (
    <figure className="h-full flex flex-col gap-[18px] rounded-2xl border border-hairline bg-surface p-8">
      {/* Rating */}
      {rating ? (
        <div className="flex items-center gap-2.5">
          <span className="text-clay text-[16px] tracking-[2px]">★★★★★</span>
          <span className="text-[14px] font-bold text-ink">{rating.toFixed(1)}</span>
        </div>
      ) : null}

      {/* Quote */}
      {quote ? (
        <blockquote className="font-serif text-[20px] leading-[1.5] text-ink flex-1">
          “{quote}”
        </blockquote>
      ) : (
        <p className="font-serif italic text-[18px] leading-[1.5] text-faint flex-1">
          Review text coming soon.
        </p>
      )}

      {/* Endorsement pills */}
      {endorsements.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {endorsements.map((tag, index) => (
            <span
              key={index}
              className="text-[12px] font-semibold text-clay rounded-full px-2.5 py-1"
              style={{ background: "color-mix(in srgb, var(--clay) 10%, transparent)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <figcaption className="flex items-center justify-between gap-3 flex-wrap border-t border-hairline pt-4 mt-1">
        <span className="flex flex-col">
          <span className="text-[15px] font-bold text-ink">{author}</span>
          {subtitle && (
            <span className="text-[13px] text-muted">{subtitle}</span>
          )}
        </span>
        {source === 'upwork' && (
          <span className="font-mono text-[11px] text-verified whitespace-nowrap">
            ✔ Verified on Upwork
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;
