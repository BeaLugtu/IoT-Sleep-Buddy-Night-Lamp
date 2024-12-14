import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhySmartGlow from "./components/WhySmartGlow";
import HowItWorks from "./components/HowItWorks";
import TechNComponents from "./components/TechNComponents";
import OurTeam from "./components/OurTeam";
import Footer from "./components/Footer";
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <Features />

      {/* About Section */}
      <HowItWorks />

      {/* TechNComponents Section */}
      <TechNComponents />

      {/* About Section */}
      <WhySmartGlow />

      {/* Our Team Section */}
      <OurTeam />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
