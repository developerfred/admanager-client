/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Constants
const BUTTON_STYLES = {
	default:
		"bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:brightness-110 transition-all duration-200",
	outline:
		"border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3]/10 transition-all duration-200",
} as const;

const buttonVariants = cva(
	[
		"relative",
		"inline-flex",
		"items-center",
		"justify-center",
		"rounded-lg",
		"text-sm",
		"font-medium",
	].join(" "),
	{
		variants: {
			variant: {
				default: BUTTON_STYLES.default,
				outline: BUTTON_STYLES.outline,
			},
			size: {
				sm: "h-9 px-4 py-2",
				md: "h-10 px-6 py-2",
				lg: "h-11 px-8 py-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

const WEB3_MODAL_STYLES = `
  :root {
	--wcm-accent-fill-color: linear-gradient(to right, #D365E3, #9AEDEF) !important;
    --w3m-accent: linear-gradient(to right, #D365E3, #9AEDEF) !important;
    --w3m-default:  linear-gradient(to right, #D365E3, #9AEDEF) !important;
    --wui-color-accent-base-100: linear-gradient(to right, #D365E3, #9AEDEF) !important;
	 

  }

  w3m-button {
    background: linear-gradient(to right, #D365E3, #9AEDEF) !important;
    border-radius: 0.5rem !important;
    transition: all 0.2s ease !important;
    height: 40px !important;
    min-width: auto !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  w3m-button > button {
    background: none !important;
    border: none !important;
    color: black !important;
    font-weight: 500 !important;
    height: 100% !important;
    width: 100% !important;
    padding: 0 1.5rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  w3m-button:hover {
    filter: brightness(110%) !important;
  }

  /* Removendo círculo rosa */
  w3m-button::before,
  w3m-button::after,
  w3m-button > *::before,
  w3m-button > *::after {
    display: none !important;
  }

  /* Modal styles */
  w3m-modal {
    --w3m-background-color: #1a1a1a !important;
    --w3m-container-border-radius: 24px !important;
    --w3m-overlay-backdrop-filter: blur(5px) !important;
  }
`;

interface ConnectButtonProps {
	variant?: "default" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
	variant = "default",
	size = "md",
	className,
}) => {
	React.useEffect(() => {
		const existingStyle = document.getElementById("web3modal-styles");
		if (existingStyle) {
			existingStyle.remove();
		}

		const style = document.createElement("style");
		style.id = "web3modal-styles";
		style.textContent = WEB3_MODAL_STYLES;
		document.head.appendChild(style);

		return () => {
			const styleToRemove = document.getElementById("web3modal-styles");
			if (styleToRemove) {
				styleToRemove.remove();
			}
		};
	}, []);

	return (
		<div className={cn("relative group rounded-lg overflow-hidden", className)}>
			<w3m-button
				label="Login"
				balance="hide"
				size={size === "lg" ? "md" : size}
				className={cn(
					buttonVariants({
						variant,
						size,
					}),
				)}
			/>
		</div>
	);
};

export default ConnectButton;
