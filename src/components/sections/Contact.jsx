import user_info from "../../data/user_info.js";
import ContactForm from "./ContactForm.jsx";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

// Two-column contact band: brand-logo links on the left, message form on the
// right. Links use the existing socials data.
function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-band border-t border-hairline"
    >
      <div className="wrap grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-14 py-16">
        {/* Left: info */}
        <div>
          <span className="eyebrow">06 · Contact</span>
          <h2 className="mt-3.5 mb-4 font-serif text-[28px] sm:text-[32px] font-normal text-ink">
            Let&apos;s get in touch.
          </h2>
          <p className="mb-7 max-w-[380px] text-[16px] leading-[1.7] text-muted">
            {user_info.contact.description}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={user_info.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[28px] text-ink hover:text-clay transition-colors duration-200"
            >
              <FaLinkedin />
            </a>
            <a
              href={user_info.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[28px] text-ink hover:text-clay transition-colors duration-200"
            >
              <FaGithub />
            </a>
            <a
              href={`mailto:${user_info.main.email}`}
              aria-label="Email"
              className="text-[28px] text-ink hover:text-clay transition-colors duration-200"
            >
              <MdEmail />
            </a>
            <a
              href="https://calendly.com/motiejunasugnius/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-block rounded-full bg-clay px-5 py-2.5 text-[14px] font-semibold text-clayink hover:bg-clay-hover transition-colors duration-300"
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </section>
  );
}

export default Contact;
