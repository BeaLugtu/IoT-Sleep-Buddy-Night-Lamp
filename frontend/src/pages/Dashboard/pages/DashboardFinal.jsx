import React, { useState, useEffect } from "react";
import LightControl from '../components/LightControl';
import '../styles/AppSerrano.css'; // Corrected import path
import "../styles/Dashboard.css";

function DashboardFinal() {

    const [lightIntensity, setLightIntensity] = useState(5);
    const [lampColor, setLampColor] = useState("rgba(255, 255, 200, 0.6)");

    return (
        <div className="dashboard relative w-full h-screen">
            <div className="lamp-wrapper absolute inset-0 z-0 pointer-events-none">
                <div className="lamp-rope"></div>
                <div className="lamp">
                    <div className="lamp-part -top">
                        <div className="lamp-part -top-part"></div>
                        <div className="lamp-part -top-part right"></div>
                    </div>
                    <div className="lamp-part -body"></div>
                    <div className="lamp-part -body right"></div>
                    <div
                        className="blub"
                        style={{
                            opacity: lightIntensity / 10,
                            backgroundColor: lampColor,
                        }}
                    ></div>
                </div>
                <div
                    className="wall-light-shadow"
                    style={{ opacity: lightIntensity / 10 }}
                ></div>
            </div>

            <div className="content relative z-10 mt-[530px] flex items-center justify-center flex-col h-full">
                <div className="text-center">
                    <h1 className="text-white text-4xl font-bold mb-2">
                        Welcome to Your Dashboard
                    </h1>
                    <h4 className="text-white text-[19px] mb-6">
                        Let’s light up your space and get started!
                    </h4>

                    <div className="flex justify-center items-center mb-24">
                        <form
                            className="formLamp lamp-slider"
                            onInput={(e) => setLightIntensity(Number(e.target.value))}
                        >
                            <div className="icon sun mx-auto mb-4">
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                                <div className="ray"></div>
                            </div>
                            <input
                                type="range"
                                id="slider"
                                value={lightIntensity}
                                min="0"
                                max="10"
                                onChange={(e) => setLightIntensity(Number(e.target.value))}
                                className="w-full max-w-xs"
                            />
                        </form>
                    </div>

                </div>

                {/* Content Section */}
                <div className="content relative  z-10 mt-[130px] flex items-center justify-center flex-col h-full">
                    <div className="text-center">
                        {/* ESP32 Light Control Header */}
                        <h1 className="text-white text-4xl font-bold mb-2">ESP32 Light Control</h1>

                        {/* LightControl Component */}
                        <LightControl />

                    </div>
                </div>
            </div>
        </div>

    );
}

export default DashboardFinal;
//comment para mapush//