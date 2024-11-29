import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Button } from '@mui/material';

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Detect scroll and apply glass effect when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`sticky top-0 z-50 transition-all ${isScrolled ? 'bg-[#000000] bg-opacity-70 backdrop-blur-md' : 'bg-transparent'}`}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl py-[25px] lg:px-32">
                <div className="flex items-center justify-between w-full">
                    {/* Group 1: Logo + Navigation */}
                    <div className="flex lg:flex-1 items-center">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <PopoverGroup className="hidden lg:flex lg:gap-x-12 ml-6">
                            <Popover className="relative">
                                <PopoverButton className="flex items-center gap-x-1 text-[16px] font-medium text-white">
                                    Product
                                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                </PopoverButton>

                                <PopoverPanel
                                    transition
                                    className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="p-4">
                                        {products.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                            >
                                                <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                                </div>
                                                <div className="flex-auto">
                                                    <a href={item.href} className="block font-semibold text-gray-900">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                        {callsToAction.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                                            >
                                                <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </PopoverPanel>
                            </Popover>

                            <a href="#" className="text-[16px] font-medium text-white">
                                Features
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                Marketplace
                            </a>
                            <a href="#" className="text-[16px] font-medium text-white">
                                Company
                            </a>
                        </PopoverGroup>
                    </div>

                    {/* Group 2: Buttons */}
                    <div className="flex items-center">
                        <Button variant="contained" sx={{
                            backgroundColor: 'rgba(161, 161, 170, 0.2)', // Custom bg color
                            color: 'rgb(236, 237, 238)', // Text color
                            fontSize: '14px', // Font size
                            width: '100px', // Width of 100px
                            borderRadius: '9999px', // Rounded corners
                            fontWeight: 'bold',
                            marginRight: '12px'
                        }}>
                            Log in
                        </Button>
                        <Button variant="contained" sx={{
                            backgroundColor: '#B249F3', // Custom bg color
                            color: 'rgb(236, 237, 238)', // Text color
                            fontSize: '14px', // Font size
                            width: '100px', // Width of 100px
                            borderRadius: '9999px', // Rounded corners
                            fontWeight: 'bold'
                        }}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    {/* Mobile menu content */}
                </DialogPanel>
            </Dialog>
        </header>
    )
}
