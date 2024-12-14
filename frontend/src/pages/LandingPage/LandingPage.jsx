import { useRef } from 'react';
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhySmartGlow from "./components/WhySmartGlow";
import BeUpdated from "./components/HowItWorks";
import About from "./components/About";
import TechNComponents from "./components/TechNComponents";
import OurTeam from "./components/OurTeam";
import Footer from "./components/Footer";

function LandingPage() {
  // Create references for each section
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const techDetailsRef = useRef(null);

  // Store all section refs in one object to pass to Header
  const sectionsRef = {
    about: aboutRef,
    features: featuresRef,
    'how-it-works': howItWorksRef,
    'tech-details': techDetailsRef,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with references for scroll */}
      <Header sectionsRef={sectionsRef} />

      {/* Sections with respective refs */}
      <section>
        <Hero />
      </section>

      {/* <section ref={aboutRef}>
        <About />
      </section> */}

      <section ref={featuresRef}>
        <Features />
      </section>

      <section ref={techDetailsRef}>
        <TechNComponents />
      </section>

      <section>
        <WhySmartGlow />
      </section>

      <section>
        <OurTeam />
      </section>

      <section ref={howItWorksRef}>
        <BeUpdated />
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
