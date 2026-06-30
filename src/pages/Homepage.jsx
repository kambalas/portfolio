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

function Homepage() {
  const { switchTheme } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div id="top" className="bg-paper text-ink min-h-screen">
      <Nav switchTheme={switchTheme} />

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
      <Footer />
    </div>
  );
}

export default Homepage;
