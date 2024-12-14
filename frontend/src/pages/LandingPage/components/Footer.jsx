import { Facebook, Instagram, Twitter, GitHub, YouTube } from '@mui/icons-material';
import { Divider } from '@mui/material';

function Footer() {
  return (
    <>
      <section className="w-full bg-darkBlue text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-1xl font-semibold mb-1 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, rgb(255, 28, 247), rgb(178, 73, 248))",
            }}
          >
            Get started
          </h2>
          <h1 className="text-5xl font-bold mb-4 leading-snug">
            Boost your productivity. <br />
            Start using our app today.
          </h1>
          <p className="text-gray-300 text-lg mb-6 mx-auto max-w-[700px]">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
          </p>

          <button className="bg-[#B04AEE] text-white px-6 py-3 rounded-full text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
            Get started
          </button>
        </div>
      </section>

      <Divider
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle white color for the divider
          width: '100%', // Controls the width of the divider
          marginTop: '100px'
        }}
      />

      <footer className="w-full bg-black text-white py-6 px-4 text-center">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex gap-8">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-all">
              <Facebook fontSize="large" />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-all">
              <Instagram fontSize="large" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-all">
              <Twitter fontSize="large" />
            </a>
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-all">
              <GitHub fontSize="large" />
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-all">
              <YouTube fontSize="large" />
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-sm text-gray-400 mt-4 sm:mt-0">&copy; 2024 Your Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
