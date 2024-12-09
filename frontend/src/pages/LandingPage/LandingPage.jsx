import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer'
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
