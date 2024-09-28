
'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import ConnectButton from '@/components/ConnectButton';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="relative bg-black/50 backdrop-blur-md p-4 sm:p-6 border-b border-[#333]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">a+</h1>
                <nav className="hidden sm:flex space-x-4">
                    <Button className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                    <Button variant="outline" className="border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3] hover:text-black"><ConnectButton /></Button>
                </nav>
                <Button variant="ghost" className="sm:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
            {isMobileMenuOpen && (
                <div className="sm:hidden mt-4 space-y-2">
                    <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                    <Button variant="outline" className="w-full border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3] hover:text-black">Login</Button>
                </div>
            )}
        </header>
    );
};

export default Header;