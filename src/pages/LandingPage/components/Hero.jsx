import { useNavigate } from 'react-router-dom';
function Hero() {
  const navigate = useNavigate()
  const handleGetstartedClick = () => {
      navigate('/signup')
  }

  return (
      <section
        className="flex items-center justify-center h-[100vh] text-white"
        style={{
          backgroundColor: "black", // Set background color to black
          backgroundImage: "url('/looper-pattern.svg')", // Overlay the SVG pattern
          backgroundSize: "cover", // Adjust the SVG size
          backgroundPosition: "center", // Center the SVG
        }}
      >
        {/* Container to center the content */}
        <div className="flex flex-col mt-[-100px] items-center text-center p-8 w-full max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Transform Your Space with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))",
              }}
            >
              SmartGlow
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 w-full sm:w-[450px] md:w-[700px] lg:w-[640px]">
            Create the perfect lighting for work, relaxation, or ambiance—automatically or with a simple touch.
          </p>
          <div className="space-x-4">
            <button onClick={handleGetstartedClick} className="px-6 py-3 bg-[#B249F3] rounded-full text-white font-semibold hover:bg-[#7d58d5]">
              Get Started
            </button>
            <button className="px-6 py-3 bg-[#202022] rounded-full text-white font-semibold hover:bg-[#8b96a5]">
              Explore Features
            </button>
          </div>
          <div className="mt-6">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-xl">★★★★★</span>
            </div>
            <p className="text-xs sm:text-sm mt-4">- Created by the Innovators</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default Hero;
  