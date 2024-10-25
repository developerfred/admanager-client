/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Advertisement } from "@/lib/contract/config";
import { Address } from "viem";

interface FeaturedAdSectionProps {
	currentAd: Advertisement | null;
	setIsCreateAdOpen: (isOpen: boolean) => void;
	formatAddress: (address: Address) => string;
	formatPrice: (price: bigint) => string;
	isWalletConnected: boolean;
}

export const FeaturedAdSection: React.FC<FeaturedAdSectionProps> = ({
	currentAd,
	setIsCreateAdOpen,
	formatAddress,
	formatPrice,
}) => (
	<Card className="overflow-hidden bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
		<CardContent className="p-0">
			<img
				src={currentAd?.imageUrl || "https://i.imgur.com/Ts32Art.jpeg"}
				alt="Featured Ad"
				className="w-full h-48 sm:h-64 object-cover"
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						"https://i.imgur.com/Ts32Art.jpeg";
				}}
			/>
			<div className="p-4 sm:p-6 bg-gradient-to-br from-[#D365E3]/20 to-[#9AEDEF]/20 backdrop-blur-sm">
				<h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
					Premium Ad Spot
				</h2>
				{currentAd ? (
					<div className="mb-4 space-y-2">
						<p className="text-[#9AEDEF]">
							Current Advertiser: {formatAddress(currentAd.advertiser)}
						</p>
						<p className="text-[#D365E3]">
							Price: {formatPrice(currentAd.price)}
						</p>
						<a
							href={currentAd.link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-white/80 hover:text-white inline-block"
						>
							Visit Ad ↗
						</a>
					</div>
				) : (
					<p className="mb-4 text-white/80">Be the first to advertise here!</p>
				)}
				<Button
					className="w-full sm:w-auto bg-white text-black hover:bg-[#D365E3] transition-colors duration-300"
					onClick={() => setIsCreateAdOpen(true)}
				>
					Create Your Ad
					<ChevronRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);
