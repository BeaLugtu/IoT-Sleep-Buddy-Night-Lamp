import { useState, useEffect } from 'react';
import pictureLamp from '../../../assets/aboutPic.png'; // Import the image

function About() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('aboutSection');
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsInView(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="aboutSection" className="bg-black py-20 px-4">
      <div className="container mx-auto flex flex-col items-center gap-10">
        {/* Right Column - Image */}
        <div className="flex justify-center">
          <div
            className={`group relative transform transition-all duration-1000 ease-in-out ${
              isInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <img
              src={pictureLamp} // Use the imported image
              alt="Sleep Buddy Night Lamp"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 rounded-lg"></div>
          </div>
        </div>

        {/* Left Column - Text */}
        <div
          className={`text-center ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} transition-all duration-1000 ease-in-out`}
          style={{ width: '700px' }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-white leading-tight">
            Sleep Buddy Night Lamp
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            A smart night lamp that enhances your sleep experience by allowing you to manage light schedules, colors, and brightness remotely. With Sleep Buddy, you can create the perfect lighting for every mood and schedule, ensuring you always wake up refreshed.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
