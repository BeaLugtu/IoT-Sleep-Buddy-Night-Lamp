function TechNComponents() {
    return (
        <section className="text-white min-h-screen flex flex-col items-center justify-center py-12">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 text-white">Tech Stack & Hardware</h1>
                <p className="text-lg text-gray-300 mb-6">A powerful combination of modern technologies and cutting-edge hardware</p>

            </div>


            {/* Project Components Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl px-4">
                {['Frontend', 'Framework', 'Backend', 'Communication Protocol'].map((category, index) => (
                    <div
                        key={index}
                        className="bg-black border border-gray-500 rounded-md text-center p-6 shadow-md hover:shadow-lg transition-all"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 border-4 rounded-full border-gray-600 flex items-center justify-center mx-auto mb-4">
                                <div className="w-20 h-20 rounded-full" style={{ background: 'linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))' }} flex items-center justify-center text-white text-3xl></div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">{category}</h3>
                        <p className="text-gray-400">
                            {index === 0
                                ? 'React.js for building dynamic UIs.'
                                : index === 1
                                    ? 'Tailwind CSS for styling, Material-UI for components.'
                                    : index === 2
                                        ? 'Node.js for backend API and hardware communication.'
                                        : 'HTTP for requests, WebSocket for real-time communication.'}
                        </p>
                    </div>
                ))}
            </div>

            {/* Hardware & Components Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl px-4">
                {['ESP32', 'LED Lighting', 'RGB LED Strips (WS2812B)', '5V USB Adapter'].map((category, index) => (
                    <div
                        key={index}
                        className="bg-black border border-gray-500 rounded-md text-center p-6 shadow-md hover:shadow-lg transition-all"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 border-4 rounded-full border-gray-600 flex items-center justify-center mx-auto mb-4">
                                <div className="w-20 h-20 rounded-full" style={{ background: 'linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))' }} flex items-center justify-center text-white text-3xl></div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">{category}</h3>
                        <p className="text-gray-400">
                            {index === 0
                                ? 'ESP32 for Wi-Fi connectivity and command reception.'
                                : index === 1
                                    ? 'LED lighting controlled via the web app.'
                                    : index === 2
                                        ? 'WS2812B LEDs for customizable lighting effects.'
                                        : '5V USB Adapter for powering Arduino and test LEDs.'}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default TechNComponents;
