// Centered call-to-action band that bridges the toolkit and the contact form.
function CTA() {
  return (
    <section className="wrap py-20 md:py-24 text-center">
      <h2 className="font-serif text-[38px] sm:text-[50px] font-normal tracking-[-0.01em] text-ink">
        Have a product to build?
      </h2>
      <p className="mt-4 mb-9 mx-auto max-w-[520px] text-[18px] text-muted">
        Tell me what you&apos;re making. I&apos;ll tell you how I&apos;d ship it.
      </p>
      <a
        href="#contact"
        className="inline-block rounded-full bg-clay px-8 py-4 text-[16px] font-semibold text-ink hover:bg-clay-hover transition-colors duration-300"
      >
        Get in touch
      </a>
    </section>
  );
}

export default CTA;
