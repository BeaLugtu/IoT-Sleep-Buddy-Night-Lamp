import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime(); // Initialize immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Detect scroll and apply glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const logoClick = () => {
    navigate("/");
  };

  return (
    <header
      className={`px-14 py-3 sticky top-0 z-50 transition-all ${
        isScrolled ? "bg-[#000000] bg-opacity-70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full px-4 py-2">
        {/* Left: Logo */}
        <div
          className="cursor-pointer flex items-center"
          onClick={logoClick}
        >
          <TipsAndUpdatesIcon
            style={{
              fontSize: "40px",
              color: "#B04AEE",
            }}
          />
        </div>

        {/* Right: Time and Logout */}
        <div className="flex items-center gap-4">
          <span className="text-white text-lg">{currentTime}</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-white gap-2 hover:text-gray-300"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}