import { useState, useEffect, useRef } from 'react';
import { Drawer, Button } from '@mui/material';
import { Bars3Icon } from '@heroicons/react/24/outline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'About', href: 'about' },
    { name: 'Features', href: 'features' },
    { name: 'How it Works', href: 'how-it-works' },
    { name: 'Tech Details', href: 'tech-details' },
];

export default function Header({ sectionsRef }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll and apply glass effect when scrolling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleSignupClick = () => {
        navigate('/signup');
    };

    const logoClick = () => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    
        // Alternatively, you can refresh the page (optional)
        window.location.reload();
    
        navigate("/"); // Navigate to the landing page (root)
    };

    // Scroll to the section
    const handleNavClick = (sectionId) => {
        sectionsRef[sectionId].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`sticky top-0 z-50 transition-all ${isScrolled ? 'bg-[#000000] bg-opacity-70 backdrop-blur-md' : 'bg-transparent'}`}>
            <nav aria-label="Global" className="flex mx-auto md:mx-60 items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <button type="button" onClick={logoClick} className="-m-1.5 p-1.5">
                        <TipsAndUpdatesIcon style={{ fontSize: '40px', color: '#B04AEE' }} />
                    </button>
                </div>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                <div className="hidden md:flex md:gap-x-12">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            className="text-[16px] font-medium text-white cursor-pointer"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex md:flex-1 lg:justify-end">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'rgba(161, 161, 170, 0.2)',
                            color: 'rgb(236, 237, 238)',
                            fontSize: '14px',
                            width: '100px',
                            borderRadius: '9999px',
                            fontWeight: 'bold',
                            marginRight: '12px',
                            textTransform: 'none', // Prevent uppercase transformation
                        }}
                        onClick={handleLoginClick}
                    >
                        Log in
                    </Button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
                <div className="flex flex-col h-full p-6 bg-[#121212] text-white">
                    <div className="space-y-4 flex-grow w-[250px]">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="flex items-center gap-x-2 p-2 text-white hover:bg-[#333] rounded-lg cursor-pointer"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <Button variant="outlined" fullWidth onClick={handleLoginClick} sx={{ color: '#fff', borderColor: '#fff' }}>
                        Log in
                    </Button>
                    <Button variant="contained" fullWidth onClick={handleSignupClick} sx={{ backgroundColor: '#B249F3', marginTop: '15px' }}>
                        Sign Up
                    </Button>
                </div>
            </Drawer>
        </header>
    );
}
