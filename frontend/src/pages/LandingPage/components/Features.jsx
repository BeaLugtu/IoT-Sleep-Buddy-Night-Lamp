import { Box, Grid } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import colorPickerImage from '../../../assets/colorPickerFeature.png';
import brightnessController from '../../../assets/brightness-controller.png';
import controllerMode from '../../../assets/controllerMode.png';
import realTimeUpdate from '../../../assets/realTimeUpdate.png';

function Features() {
  const features = [
    {
      name: "Color Picker",
      description: "Choose from a spectrum of colors to match your mood or occasion.",
      icon: colorPickerImage,
    },
    {
      name: "Brightness Control",
      description: "Fine-tune the brightness to suit your activity—day or night.",
      icon: brightnessController,
    },
    {
      name: "Manual & Automatic Modes",
      description: "Switch between time-based automation and full manual control.",
      icon: controllerMode,
    },
    {
      name: "Real-Time Updates",
      description: "Control and adjust your lamp remotely with instant response.",
      icon: realTimeUpdate,
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2
            className="text-base/7 font-semibold text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))",
            }}
          >
            Introducing SmartGlow
          </h2>          
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-balance">
            What&apos;s with SmartGlow?
          </p>
          <p className="mt-2 text-lg/8 text-gray-400">
            Smart Features to Elevate Your Lighting Experience
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <img
                      src={feature.icon}
                      alt={feature.name}
                      className="size-6"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
