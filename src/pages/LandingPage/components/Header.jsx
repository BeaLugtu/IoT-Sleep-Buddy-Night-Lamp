import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { Drawer, Button, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const navigate = useNavigate()
    // Detect scroll and apply glass effect when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to toggle the drawer
    const toggleDrawer = (open) => {
        setMobileMenuOpen(open);
    };

    const handleLoginClick = () => {
        navigate('/login')
    }
    const handleSignupClick = () => {
        navigate('/signup')
    }

    const logoClick = () => {
        navigate("/");
    };

    return (
        <header className={`sticky top-0 z-50 transition-all ${isScrolled ? 'bg-[#000000] bg-opacity-70 backdrop-blur-md' : 'bg-transparent'}`}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl py-[25px] lg:px-32 sm:px-20 md:px-16 px-11">
                <div className="flex items-center justify-between w-full">
                    {/* Group 1: Logo + Navigation */}
                    <div className="flex lg:flex-1 items-center">
                        <div
                            className="mx-auto cursor-pointer"
                            onClick={logoClick}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TipsAndUpdatesIcon
                                style={{
                                    fontSize: "40px",
                                    color: "#B04AEE", // Matching the button color
                                }}
                            />
                        </div>
                        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ml-6">
                            <a href="#" className="text-[16px] font-medium text-white">
                                Features
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                How It Works
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                Tech Details
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                Features
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                About
                            </a>
                        </PopoverGroup>
                    </div>

                    {/* Hamburger Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            type="button"
                            onClick={() => toggleDrawer(true)} // Open Drawer
                            className="inline-flex items-center justify-center p-2 text-white"
                        >
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Group 2: Buttons - Hidden on small screens */}
                    <div className="hidden lg:flex items-center">
                        <Button variant="contained" sx={{
                            backgroundColor: 'rgba(161, 161, 170, 0.2)',
                            color: 'rgb(236, 237, 238)',
                            fontSize: '14px',
                            width: '100px',
                            borderRadius: '9999px',
                            fontWeight: 'bold',
                            marginRight: '12px'
                        }}
                            onClick={handleLoginClick}>
                            Log in
                        </Button>
                        <Button variant="contained" sx={{
                            backgroundColor: '#B249F3',
                            color: 'rgb(236, 237, 238)',
                            fontSize: '14px',
                            width: '100px',
                            borderRadius: '9999px',
                            fontWeight: 'bold'
                        }}
                            onClick={handleSignupClick}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer (Right side & Dark Mode) */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => toggleDrawer(false)} // Close Drawer
                className="lg:hidden"
            >
                <div className="flex flex-col h-full p-6 bg-[#121212] text-white">
                    {/* Mobile navigation links */}
                    <div className="space-y-4 flex-grow w-[250px]">
                        {/* Product Dropdown */}
                        <div className="mt-4">
                            <button
                                onClick={() => setOpenProducts(!openProducts)}
                                className="flex items-center justify-between w-full p-2 text-white hover:bg-[#333] rounded-lg"
                            >
                                <span>Products</span>
                                <ChevronDownIcon className={`h-5 w-5 ${openProducts ? 'transform rotate-180' : ''}`} />
                            </button>
                            <Collapse in={openProducts}>
                                <div className="space-y-2 mt-2">
                                    {products.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-x-2 p-2 text-white hover:bg-[#333] rounded-lg"
                                        >
                                            <item.icon className="h-5 w-5 text-gray-300" />
                                            <span>{item.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </Collapse>
                        </div>

                        {/* Navigation Links without Dropdown */}
                        <div className="mt-4 space-y-2">
                            <a href="#" className="flex items-center gap-x-2 p-2 text-white hover:bg-[#333] rounded-lg">
                                <span>Features</span>
                            </a>
                            <a href="#" className="flex items-center gap-x-2 p-2 text-white hover:bg-[#333] rounded-lg">
                                <span>Marketplace</span>
                            </a>
                            <a href="#" className="flex items-center gap-x-2 p-2 text-white hover:bg-[#333] rounded-lg">
                                <span>Company</span>
                            </a>
                        </div>

                    </div>



                    {/* Action Buttons */}
                    <Button variant="outlined" fullWidth onClick={() => toggleDrawer(false)} sx={{ color: '#fff', borderColor: '#fff' }}>
                        Log in
                    </Button>
                    <Button variant="contained" fullWidth onClick={() => toggleDrawer(false)} sx={{ backgroundColor: '#B249F3', marginTop: '15px' }}>
                        Sign Up
                    </Button>
                </div>
            </Drawer>
        </header>
    );
}