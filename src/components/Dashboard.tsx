/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Star, Loader2 } from "lucide-react";
import { formatAddress } from "@/utils/formatters";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { admanangerConfig, type Advertisement } from "@/lib/contract/config";
import { useAccount, useWriteContract } from "wagmi";
import { AllAdsSection } from "@/components/dashboard/AllAdsSection";
import { FeaturedAdSection } from "@/components/dashboard/FeaturedAdSection";
import { TopEngagersSection } from "@/components/dashboard/TopEngagersSection";
import { TopAdsSection } from "@/components/dashboard/TopAdsSection";
import { SpecialEventSection } from "@/components/dashboard/SpecialEventSection";
import { useAdManager } from "@/hooks/useAdManager";

const isDev = process.env.NODE_ENV === "development";

const formatters = {
	engagements: (engagements: bigint): string => {
		return Number(engagements).toLocaleString();
	},
	date: (timestamp: bigint): string => {
		return new Date(Number(timestamp) * 1000).toLocaleDateString();
	},
	price: (price: bigint): string => {
		return `${(Number(price) / 1e18).toFixed(4)} ETH`;
	},
};

interface DashboardProps {
	setIsCreateAdOpen: (isOpen: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setIsCreateAdOpen }) => {
	const { currentAd, allAds, topAds, isLoading, error } = useAdManager();
	const { writeContract } = useWriteContract();
	const [processingAdIndex, setProcessingAdIndex] = useState<number | null>(
		null,
	);
	const { isConnected } = useAccount();

	useEffect(() => {
		if (!isDev) return;

		console.group("📊 Dashboard State");
		console.log("Current Ad:", currentAd);
		console.log("All Ads:", allAds);
		console.log("Top Ads:", topAds);
		console.log("Loading:", isLoading);
		console.log("Error:", error);
		console.groupEnd();
	}, [currentAd, allAds, topAds, isLoading, error]);

	const handleEngagement = async (adIndex: bigint) => {
		if (isDev)
			console.log("🎯 Attempting engagement with ad:", adIndex.toString());

		setProcessingAdIndex(Number(adIndex));

		try {
			const { hash } = await writeContract({
				...admanangerConfig,
				functionName: "recordEngagement",
				args: [adIndex],
			});

			if (isDev) console.log("📝 Engagement transaction hash:", hash);

			toast.promise(
				async () => {
					await hash;
					if (isDev)
						console.log("✅ Engagement confirmed for ad:", adIndex.toString());
				},
				{
					loading: "Recording engagement...",
					success: "Engagement recorded successfully!",
					error: (err) => {
						if (isDev) console.error("❌ Engagement error:", err);
						return "Failed to record engagement";
					},
				},
			);
		} catch (error) {
			console.error("❌ Engagement error:", {
				error,
				message: error instanceof Error ? error.message : "Unknown error",
			});
			toast.error(
				error instanceof Error ? error.message : "Failed to engage with ad",
			);
		} finally {
			setProcessingAdIndex(null);
		}
	};

	const renderAdCard = (ad: Advertisement) => {
		const isCurrentAd = currentAd && ad.index === currentAd.index;
		const isProcessing = processingAdIndex === ad.index;

		if (isDev) {
			console.log(`🎨 Rendering ad card:`, {
				index: ad.index,
				isCurrentAd,
				isProcessing,
				advertiser: ad.advertiser,
				engagements: ad.engagements.toString(),
			});
		}

		return (
			<Card className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300 transform hover:-translate-y-1">
				<CardContent className="p-4">
					<div className="relative">
						<img
							src={ad.imageUrl}
							alt="Ad"
							className="w-full h-32 object-cover mb-2 rounded"
							onError={(e) => {
								if (isDev) console.warn("⚠️ Image load error, using fallback");
								(e.target as HTMLImageElement).src =
									"https://i.imgur.com/Ts32Art.jpeg";
							}}
						/>
						{isCurrentAd && (
							<div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
								<Star className="h-3 w-3 mr-1" /> Current
							</div>
						)}
					</div>
					<div className="space-y-2">
						<a
							href={ad.link}
							target="_blank"
							rel="noopener noreferrer"
							className="font-bold text-[#9AEDEF] hover:text-[#D365E3] transition-colors duration-300"
						>
							Visit Ad ↗
						</a>
						<div className="text-xs space-y-1">
							<p className="text-[#D365E3]">
								{formatters.engagements(ad.engagements)} engagements
							</p>
							<p className="text-white/60">
								Price: {formatters.price(ad.price)}
							</p>
							<p className="text-white/60">by {formatAddress(ad.advertiser)}</p>
							<p className="text-white/60">
								Created: {formatters.date(ad.createdAt)}
							</p>
						</div>
					</div>
					<Button
						className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 transition-all duration-300 mt-3"
						onClick={() => handleEngagement(ad.index)}
						disabled={!ad.isActive || isProcessing}
					>
						<ThumbsUp className="h-4 w-4 mr-2" />
						{isProcessing ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
							</>
						) : ad.isActive ? (
							"Engage"
						) : (
							"Inactive"
						)}
					</Button>
				</CardContent>
			</Card>
		);
	};

	if (isLoading) {
		if (isDev) console.log("⏳ Dashboard is loading...");
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2 className="h-8 w-8 animate-spin text-[#D365E3]" />
			</div>
		);
	}

	if (isDev) {
		console.log("🎨 Dashboard rendering with:", {
			hasCurrentAd: !!currentAd,
			totalAds: allAds.length,
			topAdsCount: topAds.length,
		});
	}

	return (
		<>
			{error && (
				<Alert variant="destructive" className="mb-4">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error as unknown as ReactNode}</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
				<div className="lg:col-span-2 space-y-6">
					<FeaturedAdSection
						currentAd={currentAd}
						setIsCreateAdOpen={setIsCreateAdOpen}
						formatAddress={formatAddress}
						formatPrice={formatters.price}
						isWalletConnected={isConnected}
					/>
					<TopAdsSection ads={topAds} renderAdCard={renderAdCard} />
					<AllAdsSection ads={allAds} renderAdCard={renderAdCard} />
				</div>
				<div className="space-y-6">
					<TopEngagersSection engagers={[]} formatAddress={formatAddress} />
					<SpecialEventSection specialEvent={null} />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
