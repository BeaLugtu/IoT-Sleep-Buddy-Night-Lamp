import { Box, Grid } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import colorPickerImage from '../../../assets/colorPickerFeature.png'
import brightnessController from '../../../assets/brightness-controller.png'
import controllerMode from '../../../assets/controllerMode.png'
import realTimeUpdate from '../../../assets/realTimeUpdate.png'

function Features() {
  const features = [
    {
      title: "Color Picker",
      description: "Choose from a spectrum of colors to match your mood or occasion.",
      image: colorPickerImage, // Replace with actual image path
    },
    {
      title: "Brightness Control",
      description: "Fine-tune the brightness to suit your activity—day or night.",
      image: brightnessController // Replace with actual image path
    },
    {
      title: "Manual & Automatic Modes",
      description: "Switch between time-based automation and full manual control.",
      image: controllerMode // Replace with actual image path
    },
    {
      title: "Real-Time Updates",
      description: "Control and adjust your lamp remotely with instant response.",
      image: realTimeUpdate // Replace with actual image path
    },
  ];

  // Scroll animation for the title (animating from top to bottom)
  const titleAnimation = useSpring({
    from: { transform: "translateY(-50px)", opacity: 0 }, // Start above the screen
    to: { transform: "translateY(0)", opacity: 1 }, // Move to the default position
    config: { duration: 1000 }, // Duration for the title animation
  });

  // Scroll animation for the subtitle (animating from top to bottom)
  const subtitleAnimation = useSpring({
    from: { transform: "translateY(-30px)", opacity: 0 }, // Start above the screen
    to: { transform: "translateY(0)", opacity: 1 }, // Move to the default position
    config: { duration: 1000 }, // Duration for the subtitle animation
  });

  const [inView, setInView] = useState(Array(features.length).fill(false));
  const featureRefs = useRef([]);

  // Create an observer to detect when elements are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setInView((prevInView) => {
              const updatedInView = [...prevInView];
              updatedInView[index] = true;
              return updatedInView;
            });
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is in view
    );

    // Observe each feature element
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, []);

  return (
    <section className="py-20 text-center mt-32">
      <animated.h1 style={titleAnimation} className="text-4xl font-bold text-white mb-2">
        What&apos;s with SmartGlow?
      </animated.h1>
      <animated.h2 style={subtitleAnimation} className="text-[27px] text-gray-400 font-normal mb-6">
        Smart Features to Elevate Your Lighting Experience
      </animated.h2>

      {/* Grid layout for the boxes */}
      <Grid
        container
        spacing={3} // Spacing between items
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
        sx={{
          width: "100%", // Full width
          margin: "2 auto", // Center container
          padding: { xs: "0 20px", sm: "0 40px", lg: "0 220px" }, // Responsive padding
        }}
      >
        {features.map((feature, index) => {
          // Container animations triggered by inView state
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const containerAnimation = useSpring({
            opacity: inView[index] ? 1 : 0,
            transform: inView[index]
              ? "translateY(0)"
              : "translateY(100px)", // Animation to slide from the right when in view
            config: { duration: 1000 }, // Duration for container animation
          });

          return (
            <Grid
              item
              xs={12} // Full width for small screens
              sm={6} // 2 containers per row for medium screens
              lg={3} // 4 containers per row for large screens
              key={index}
            >
              <animated.div
                style={containerAnimation}
                ref={(el) => (featureRefs.current[index] = el)} // Assigning refs to each feature item
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
                    border: "1px solid #333", // White border
                    borderRadius: "10px", // Border radius
                    padding: "30px",
                    textAlign: "center",
                    minWidth: "300px", // Minimum width
                    maxWidth: "100%", // Prevent overflow
                    margin: "0 auto", // Center the box horizontally
                    boxSizing: "border-box", // Include padding in width/height
                    "&:hover": {
                      transform: "scale(1.01)", // Scale slightly on hover
                    },
                  }}
                >
                  {/* Image Section */}
                  <Box
                    component="img"
                    src={feature.image} // Image from feature object
                    alt={feature.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      marginBottom: "16px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Text Section */}
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Box>
              </animated.div>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
}

export default Features;
