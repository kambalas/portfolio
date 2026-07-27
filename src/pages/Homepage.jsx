import { AppContext } from "../App.jsx";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Nav from "../components/sections/Nav.jsx";
import Hero from "../components/sections/Hero.jsx";
import Metrics from "../components/sections/Metrics.jsx";
import LogoStrip from "../components/sections/LogoStrip.jsx";
import Projects from "../components/sections/Projects.jsx";
import Services from "../components/sections/Services.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import EducationAndExperience from "../components/sections/EducationAndExperience.jsx";
import Skills from "../components/sections/Skills.jsx";
import CTA from "../components/sections/CTA.jsx";
import Contact from "../components/sections/Contact.jsx";
import Footer from "../components/sections/Footer.jsx";

import { useScrollDepth } from "../hooks/useScrollDepth.js";
import { useSectionTracking } from "../hooks/useSectionTracking.js";
import { usePageEngagement } from "../hooks/usePageEngagement.js";
import { useInteractionQuality } from "../hooks/useInteractionQuality.js";

// Observed for view + dwell time, in page order. Must match the ids rendered
// below — a missing element is skipped rather than throwing.
const TRACKED_SECTIONS = [
  "about",
  "metrics",
  "brands",
  "projects",
  "services",
  "reviews",
  "experience",
  "skills",
  "cta",
  "contact",
];

function Homepage() {
  const { switchTheme } = useContext(AppContext);
  const location = useLocation();

  // ── Behavioural tracking ──
  const maxScrollRef = useScrollDepth("homepage");
  const currentSectionRef = useSectionTracking(TRACKED_SECTIONS);
  usePageEngagement({ maxScrollRef, currentSectionRef, resetKey: "homepage" });
  useInteractionQuality(currentSectionRef);

  // When arriving with a hash (e.g. back from a project via /#projects),
  // scroll to that section. Client-side navigations don't do this natively.
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      // 'instant' overrides the global smooth scroll — arriving from another
      // page should not animate through the whole homepage.
      if (target) target.scrollIntoView({ behavior: 'instant' });
    }
  }, [location.hash]);

  return (
    <div id="top" className="bg-paper text-ink min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2
          focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-clayink"
      >
        Skip to content
      </a>
      <Nav switchTheme={switchTheme} />

      <main id="main">
        <Hero />
        <Metrics />
        <LogoStrip />
        <Projects />
        <Services />
        <Testimonials />
        <EducationAndExperience />
        <Skills />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
