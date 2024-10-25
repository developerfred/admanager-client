/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatEther, type Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { globalABI } from "@/config/abi";
import {
	Loader2,
	ExternalLink,
	Activity,
	Calendar,
	Trophy,
	Star,
	Users,
	Gauge,
} from "lucide-react";

// Types
interface Advertisement {
	link: string;
	imageUrl: string;
	price: bigint;
	advertiser: Address;
	referrer: Address;
	isActive: boolean;
	engagements: bigint;
	createdAt: bigint;
}

interface UserDetails {
	reputation: bigint;
	timesChief: bigint;
	referredBy: Address;
	isAdvertiser: boolean;
}

interface UserStats {
	totalEngagements: bigint;
	engagedAdsCount: bigint;
	level: bigint;
	isActive: boolean;
}

interface MyAdsProps {
	setIsCreateAdOpen: (isOpen: boolean) => void;
	contractAddress: Address;
}

// Component-specific styles
const styles = {
	gradientText:
		"bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]",
	card: "bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300",
	button:
		"w-full py-6 mt-6 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 text-lg font-bold transition-all duration-300 transform hover:scale-105",
	statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
	statCard: "p-4 rounded-lg bg-black/30 border border-[#D365E3]/20",
};

const MyAds: React.FC<MyAdsProps> = ({
	setIsCreateAdOpen,
	contractAddress,
}) => {
	const { address } = useAccount();
	const [userAds, setUserAds] = useState<Advertisement[]>([]);

	const {
		data: contractData,
		isLoading,
		error,
	} = useReadContracts({
		contracts: [
			{
				address: contractAddress,
				abi: globalABI,
				functionName: "getUserCreatedAds",
				args: address ? [address] : undefined,
			},
			{
				address: contractAddress,
				abi: globalABI,
				functionName: "getUserDetails",
				args: address ? [address] : undefined,
			},
			{
				address: contractAddress,
				abi: globalABI,
				functionName: "getUserStats",
				args: address ? [address] : undefined,
			},
		],
	});

	useEffect(() => {
		if (contractData?.[0]?.result) {
			setUserAds(contractData[0].result as Advertisement[]);
		}
	}, [contractData]);

	const userDetails = contractData?.[1]?.result as UserDetails | undefined;
	const userStats = contractData?.[2]?.result as UserStats | undefined;

	const StatsCard = ({ icon: Icon, title, value, color }: any) => (
		<Card className={styles.statCard}>
			<CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
				<Icon className={`h-6 w-6 ${color}`} />
				<h3 className="text-sm text-gray-400">{title}</h3>
				<p className={`text-xl font-bold ${styles.gradientText}`}>{value}</p>
			</CardContent>
		</Card>
	);

	const renderStats = () => (
		<div className={styles.statsGrid}>
			<StatsCard
				icon={Trophy}
				title="Reputation"
				value={userDetails?.reputation.toString() || "0"}
				color="text-yellow-500"
			/>
			<StatsCard
				icon={Star}
				title="Times Chief"
				value={userDetails?.timesChief.toString() || "0"}
				color="text-purple-500"
			/>
			<StatsCard
				icon={Users}
				title="Total Engagements"
				value={userStats?.totalEngagements.toString() || "0"}
				color="text-blue-500"
			/>
			<StatsCard
				icon={Gauge}
				title="Level"
				value={userStats?.level.toString() || "0"}
				color="text-green-500"
			/>
		</div>
	);

	const renderAdCard = (ad: Advertisement, index: number) => (
		<Card key={index} className={styles.card}>
			<CardHeader>
				<CardTitle className="text-xl font-bold text-[#9AEDEF]">
					Ad #{index + 1}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4 space-y-3">
				<Image
					src={ad.imageUrl}
					alt={`Ad ${index + 1}`}
					width={400}
					height={200}
					className="w-full h-40 object-cover rounded-md shadow-md"
				/>
				<p className="flex items-center text-[#D365E3]">
					<ExternalLink className="mr-2 h-4 w-4" />
					<a
						href={ad.link}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{ad.link}
					</a>
				</p>
				<p className="text-[#9AEDEF]">
					Investment: {formatEther(ad.price)} ETH
				</p>
				<p className="flex items-center">
					<span
						className={`px-2 py-1 rounded-full text-xs font-semibold ${
							ad.isActive ? "bg-green-500 text-black" : "bg-red-500 text-white"
						}`}
					>
						{ad.isActive ? "Active" : "Inactive"}
					</span>
				</p>
				<p className="flex items-center text-[#D365E3]">
					<Activity className="mr-2 h-4 w-4" />
					Engagements: {ad.engagements.toString()}
				</p>
				<p className="flex items-center text-[#9AEDEF]">
					<Calendar className="mr-2 h-4 w-4" />
					Created: {new Date(Number(ad.createdAt) * 1000).toLocaleDateString()}
				</p>
			</CardContent>
		</Card>
	);

	const renderContent = () => {
		if (isLoading) {
			return (
				<Card className={styles.card}>
					<CardContent className="flex items-center justify-center p-10">
						<Loader2 className="mr-2 h-6 w-6 animate-spin text-[#D365E3]" />
						<p className="text-lg text-[#9AEDEF]">
							Fetching your masterpieces...
						</p>
					</CardContent>
				</Card>
			);
		}

		if (error) {
			return (
				<Card className={`${styles.card} border-red-500`}>
					<CardContent className="p-6">
						<p className="text-center text-lg text-red-400">
							Oops! We hit a snag loading your ads. Let&apos;s give it another
							shot!
						</p>
					</CardContent>
				</Card>
			);
		}

		return (
			<>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{userAds.length > 0 ? (
						userAds.map(renderAdCard)
					) : (
						<Card className={`${styles.card} col-span-full border-[#D365E3]`}>
							<CardContent className="p-8 text-center">
								<h3 className="text-2xl font-bold text-[#9AEDEF] mb-4">
									Your Ad Space Awaits!
								</h3>
								<p className="text-lg text-[#D365E3] mb-6">
									Ready to make your mark? Create your first ad and watch your
									influence grow!
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</>
		);
	};

	return (
		<div className="space-y-6">
			<h2 className={`text-3xl font-bold mb-6 ${styles.gradientText}`}>
				Your Ad Gallery
			</h2>
			{renderStats()}
			{renderContent()}
			<Button className={styles.button} onClick={() => setIsCreateAdOpen(true)}>
				{userAds.length > 0
					? "🚀 Launch Another Ad"
					: "🎨 Create Your First Masterpiece"}
			</Button>
		</div>
	);
};

export default MyAds;
