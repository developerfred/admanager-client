/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars*/

"use client";
import React, { useState, useEffect } from "react";
import {
	createPublicClient,
	http,
	createWalletClient,
	custom,
	Address,
	WalletClient,
	parseEther,
} from "viem";
import { scroll } from "viem/chains";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Dashboard from "@/components/Dashboard";
import MyAds from "@/components/MyAds";
import Achievements from "@/components/Achievements";
import CommunityChallenge from "@/components/CommunityChallenge";
import CreateAdDialog from "@/components/CreateAdDialog";
import {
	admanangerABI,
	contractAddress,
  CurrentAd,	
} from "@/lib/contract/config";

const isDev = process.env.NODE_ENV === "development";

const publicClient = createPublicClient({
	chain: scroll,
	transport: http(process.env.REACT_APP_RPC_URL),
});

interface NewAdData {
	link: string;
	imageUrl: string;
	referrer: Address;
}

type FlexibleProvider = {
	request: (...args: any[]) => Promise<any>;
	[key: string]: any;
};

const BASE_PRICE = "0.0003";
const PRICE_INCREASE_PERCENTAGE = 0.05;

const EnhancedAdManager: React.FC = () => {
	const [currentAd, setCurrentAd] = useState<CurrentAd | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [isCreateAdOpen, setIsCreateAdOpen] = useState<boolean>(false);
	const [isMetaMaskInstalled, setIsMetaMaskInstalled] =
		useState<boolean>(false);
	const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
	const [newAdData, setNewAdData] = useState<NewAdData>({
		link: "",
		imageUrl: "",
		referrer: "0x0000000000000000000000000000000000000000" as Address,
	});

  async function calculateNextAdPrice(): Promise<bigint> {
    try {
      const totalAds = (await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: admanangerABI,
        functionName: "getTotalAds",
      })) as bigint;

      const totalAdsCount = Number(totalAds);

      
      const basePrice = Number.parseFloat(BASE_PRICE);

      
      
      // biome-ignore lint/style/useExponentiationOperator: <explanation>
                  const price = basePrice * Math.pow(1 + PRICE_INCREASE_PERCENTAGE, totalAdsCount);

      
      const priceString = price.toFixed(18);

      if (isDev) {
        console.log('Price calculation:', {
          totalAds: totalAdsCount,
          basePrice,
          calculatedPrice: price,
          finalPriceString: priceString
        });
      }

      
      return parseEther(priceString);
    } catch (error) {
      console.error("Error calculating next ad price:", error);
      if (isDev) {
        console.error('Detailed error:', {
          error,
          basePrice: BASE_PRICE,
          fallingBackToBase: true
        });
      }      
      return parseEther(BASE_PRICE);
    }
  }

	useEffect(() => {
		checkMetaMaskInstallation();
		loadBlockchainData();
	}, []);

	function checkMetaMaskInstallation(): void {
		const provider =
			typeof window !== "undefined" ? window.ethereum : undefined;
		const isInstalled = !!provider?.isMetaMask;
		setIsMetaMaskInstalled(isInstalled);

		if (isInstalled && provider) {
			const flexibleProvider = provider as FlexibleProvider;

			const client = createWalletClient({
				chain: scroll,
				transport: custom(flexibleProvider),
			});
			setWalletClient(client);
		}
	}

	async function loadBlockchainData(): Promise<void> {
		setIsLoading(true);
		setError("");
		try {
			const ad = (await publicClient.readContract({
				address: contractAddress as `0x${string}`,
				abi: admanangerABI,
				functionName: "getLatestAd",
			})) as unknown as {
				link: string;
				imageUrl: string;
				price: bigint;
				advertiser: Address;
				referrer: Address;
				isActive: boolean;
				engagements: bigint;
				createdAt: bigint;
			};

			setCurrentAd({
				link: ad.link,
				imageUrl: ad.imageUrl,
				price: ad.price,
				advertiser: ad.advertiser,
				referrer: ad.referrer,
				isActive: ad.isActive,
				engagements: ad.engagements,
				createdAt: ad.createdAt,
			});
		} catch (error) {
			console.error("An error occurred:", error);
			setError("Failed to load blockchain data. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	async function createNewAd(): Promise<void> {
		if (!isMetaMaskInstalled || !walletClient) {
			setError("Please install web3 wallet to create an ad.");
			return;
		}

		setIsLoading(true);
		setError("");
		try {
			const [address] = await walletClient.requestAddresses();
			const priceInWei = await calculateNextAdPrice();

			const hash = await walletClient.writeContract({
				account: address,
				address: contractAddress,
				abi: admanangerABI,
				functionName: "createAdvertisement",
				args: [newAdData.link, newAdData.imageUrl, newAdData.referrer],
				value: priceInWei,
				chain: scroll,
			});

			// Wait for transaction confirmation
			const receipt = await publicClient.waitForTransactionReceipt({
				hash,
				confirmations: 2, // Wait for 2 confirmations for better security
			});

			if (receipt.status === "success") {
				await loadBlockchainData();
				setIsCreateAdOpen(false);
			} else {
				throw new Error("Transaction failed");
			}
		} catch (error: any) {
			console.error("Transaction error:", error);
			setError(
				error.message ||
					"Failed to create ad. Please ensure you have enough ETH and try again.",
			);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCreateAdClose = () => setIsCreateAdOpen(false);

	return (
		<>
			{error && (
				<Alert variant="destructive" className="mb-4">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Tabs defaultValue="dashboard" className="w-full">
				<TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-black/50 backdrop-blur-md rounded-full p-1">
					<TabsTrigger value="dashboard" className="rounded-full">
						Dashboard
					</TabsTrigger>
					<TabsTrigger value="my-ads" className="rounded-full">
						My Ads
					</TabsTrigger>
					<TabsTrigger value="achievements" className="rounded-full">
						Achievements
					</TabsTrigger>
					<TabsTrigger value="community" className="rounded-full">
						Community
					</TabsTrigger>
				</TabsList>
				<TabsContent value="dashboard">
					<Dashboard
						setIsCreateAdOpen={setIsCreateAdOpen}						
					/>
				</TabsContent>
				<TabsContent value="my-ads">
					<MyAds
						contractAddress={contractAddress}
						setIsCreateAdOpen={setIsCreateAdOpen}
					/>
				</TabsContent>
				<TabsContent value="achievements">
					<Achievements />
				</TabsContent>
				<TabsContent value="community">
					<CommunityChallenge />
				</TabsContent>
			</Tabs>

			<CreateAdDialog
				isOpen={isCreateAdOpen}
				setIsOpen={handleCreateAdClose}
				createNewAd={createNewAd}
				isLoading={isLoading}
				newAdData={newAdData}
				setNewAdData={setNewAdData}
			/>
		</>
	);
};

export default EnhancedAdManager;
