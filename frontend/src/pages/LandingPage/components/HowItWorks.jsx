import { CheckCircle } from "@mui/icons-material"; // Importing the check icon from MUI
import { useSpring, animated } from '@react-spring/web';
import { useInView } from "react-intersection-observer";
import howItWorks from "../../../assets/howItWorks.png";

function HowItWorks() {
  // Intersection Observer Hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once when entering view
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  // Animation for left column (image) to slide in from the bottom with 1 second duration
  const leftColumnAnimation = useSpring({
    transform: inView ? "translateY(0)" : "translateY(50%)", // Trigger slide when in view
    opacity: inView ? 1 : 0, // Fade in when section is in view
    config: { duration: 600 }, // 1 second duration
    reset: false, // Don't reset when out of view
  });

  // Animation for right column (text) to slide in from the bottom with 1 second duration
  const rightColumnAnimation = useSpring({
    transform: inView ? "translateY(0)" : "translateY(50%)", // Trigger slide when in view
    opacity: inView ? 1 : 0, // Fade in when section is in view
    config: { duration: 600 }, // 1 second duration
    reset: false, // Don't reset when out of view
  });

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-black to-[#343434] text-white px-36 mt-11"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column with Image */}
        <animated.div
          className="flex justify-center items-center"
          style={leftColumnAnimation} // Apply animation when in view
        >
          <img
            src={howItWorks} // Replace with your image URL
            alt="How It Works"
            className="w-full h-auto rounded-lg"
          />
        </animated.div>

        {/* Right Column with Text */}
        <animated.div
          className="flex flex-col justify-center"
          style={rightColumnAnimation} // Apply animation when in view
        >
          <h3 className="text-4xl font-semibold mb-4">
            <span className="text-white">Your Lighting, </span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))",
                WebkitBackgroundClip: "text", // This ensures the gradient appears on the text
                color: "transparent", // Make the text transparent so the gradient shows
              }}
            >
              Simplified
            </span>
          </h3>

          <p className="text-[21px] mb-6">
            With SmartGlow, managing your environment is effortless, thanks to
            the simple interface and intuitive controls that work with your
            lifestyle.
          </p>

          {/* Steps with check icons */}
          <ul className="list-none space-y-4">
            <li className="flex items-center text-lg">
              <CheckCircle style={{ color: "#B249F3", marginRight: "18px" }} />
              <span style={{ fontSize: "20px" }}>
                Set Up: Connect the lamp and sync with the app.
              </span>
            </li>
            <li className="flex items-center text-lg">
              <CheckCircle style={{ color: "#B249F3", marginRight: "18px" }} />
              <span style={{ fontSize: "20px" }}>
                Customize: Set schedules, colors, and brightness.
              </span>
            </li>
            <li className="flex items-center text-lg">
              <CheckCircle style={{ color: "#B249F3", marginRight: "18px" }} />
              <span style={{ fontSize: "20px" }}>
                Control: Toggle between manual and auto modes.
              </span>
            </li>
          </ul>
        </animated.div>
      </div>
    </section>
  );
}

export default HowItWorks;
