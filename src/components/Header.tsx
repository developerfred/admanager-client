"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import ConnectButton from "@/components/ConnectButton";
import { cn } from "@/lib/utils";

const STYLES = {
	HEADER: {
		WRAPPER:
			"relative bg-black/50 backdrop-blur-md p-4 sm:p-6 border-b border-[#333]",
		CONTAINER: "max-w-7xl mx-auto flex justify-between items-center",
	},
	LOGO: {
		TEXT: "text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]",
	},
	NAV: {
		DESKTOP: "hidden sm:flex space-x-4",
	},
	BUTTON: {
		SEARCH:
			"bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-white hover:brightness-110 transition-all duration-200",
		CONNECT:
			"border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3]/10 transition-all duration-200",
		MENU: "sm:hidden",
		ICON: "h-4 w-4 mr-2",
		MENU_ICON: "h-6 w-6",
	},
	MOBILE_MENU: {
		CONTAINER: "sm:hidden mt-4 space-y-2",
		BUTTON: "w-full",
	},
} as const;

interface NavButtonProps {
	variant?: "search" | "connect";
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({
	variant = "search",
	onClick,
	className,
	children,
}) => {
	const styles = {
		search: STYLES.BUTTON.SEARCH,
		connect: STYLES.BUTTON.CONNECT,
	};

	return (
		<Button
			variant={variant === "connect" ? "outline" : "default"}
			className={cn(styles[variant], className)}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

const Header: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const renderDesktopNav = () => (
		<nav className={STYLES.NAV.DESKTOP}>
			<NavButton variant="search">
				<Search className={STYLES.BUTTON.ICON} />
				Search
			</NavButton>

			<ConnectButton variant="default" size="md" />
		</nav>
	);

	const renderMobileMenu = () =>
		isMobileMenuOpen && (
			<div className={STYLES.MOBILE_MENU.CONTAINER}>
				<NavButton variant="search" className={STYLES.MOBILE_MENU.BUTTON}>
					<Search className={STYLES.BUTTON.ICON} />
					Search
				</NavButton>
				<NavButton variant="connect" className={STYLES.MOBILE_MENU.BUTTON}>
					<ConnectButton variant="default" size="md" />
				</NavButton>
			</div>
		);

	const renderMobileMenuButton = () => (
		<Button
			variant="ghost"
			className={STYLES.BUTTON.MENU}
			onClick={toggleMobileMenu}
		>
			<Menu className={STYLES.BUTTON.MENU_ICON} />
		</Button>
	);

	return (
		<header className={STYLES.HEADER.WRAPPER}>
			<div className={STYLES.HEADER.CONTAINER}>
				<h1 className={STYLES.LOGO.TEXT}>a+</h1>
				{renderDesktopNav()}
				{renderMobileMenuButton()}
			</div>
			{renderMobileMenu()}
		</header>
	);
};

export default Header;
