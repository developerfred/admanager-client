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

// Constants
const CONSTANTS = {
  BASE_PRICE: "0.0003",
  PRICE_INCREASE_PERCENTAGE: 0.05,
  DEFAULT_REFERRER: "0x0000000000000000000000000000000000000000" as Address,
  CONFIRMATION_BLOCKS: 2,
} as const;

const STYLES = {
  TABS_LIST: "grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-black/50 backdrop-blur-md rounded-full p-1",
  TAB_TRIGGER: "rounded-full",
  ALERT: "mb-4",
} as const;

const TAB_CONFIG = {
  DEFAULT: "dashboard",
  ITEMS: [
    { value: "dashboard", label: "Dashboard", component: Dashboard },
    { value: "my-ads", label: "My Ads", component: MyAds },
    { value: "achievements", label: "Achievements", component: Achievements },
    { value: "community", label: "Community", component: CommunityChallenge },
  ],
} as const;

// Types
interface NewAdData {
  link: string;
  imageUrl: string;
  referrer: Address;
}

type FlexibleProvider = {
  request: (...args: any[]) => Promise<any>;
  [key: string]: any;
};

// Client Setup
const isDev = process.env.NODE_ENV === "development";

const publicClient = createPublicClient({
  chain: scroll,
  transport: http(process.env.REACT_APP_RPC_URL),
});

// Component
const EnhancedAdManager: React.FC = () => {
  // State
  const [currentAd, setCurrentAd] = useState<CurrentAd | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isCreateAdOpen, setIsCreateAdOpen] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [newAdData, setNewAdData] = useState<NewAdData>({
    link: "",
    imageUrl: "",
    referrer: CONSTANTS.DEFAULT_REFERRER,
  });

  // Utility Functions
  const logDevInfo = (message: string, data: any) => {
    if (isDev) {
      console.log(message, data);
    }
  };

  const handleError = (error: any, message: string) => {
    console.error(message, error);
    setError(error.message || message);
  };

  // Core Functions
  const calculateNextAdPrice = async (): Promise<bigint> => {
    try {
      const totalAds = (await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: admanangerABI,
        functionName: "getTotalAds",
      })) as bigint;

      const totalAdsCount = Number(totalAds);
      const basePrice = Number.parseFloat(CONSTANTS.BASE_PRICE);
      const price = basePrice * Math.pow(1 + CONSTANTS.PRICE_INCREASE_PERCENTAGE, totalAdsCount);
      const priceString = price.toFixed(18);

      logDevInfo('Price calculation:', {
        totalAds: totalAdsCount,
        basePrice,
        calculatedPrice: price,
        finalPriceString: priceString
      });

      return parseEther(priceString);
    } catch (error) {
      logDevInfo('Price calculation error:', { error, fallingBackToBase: true });
      return parseEther(CONSTANTS.BASE_PRICE);
    }
  };

  const checkMetaMaskInstallation = (): void => {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined;
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
  };

  const loadBlockchainData = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    try {
      const ad = (await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: admanangerABI,
        functionName: "getLatestAd",
      })) as unknown as CurrentAd;

      setCurrentAd(ad);
    } catch (error) {
      handleError(error, "Failed to load blockchain data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewAd = async (): Promise<void> => {
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

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: CONSTANTS.CONFIRMATION_BLOCKS,
      });

      if (receipt.status === "success") {
        await loadBlockchainData();
        setIsCreateAdOpen(false);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      handleError(error, "Failed to create ad. Please ensure you have enough ETH and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    checkMetaMaskInstallation();
    loadBlockchainData();
  }, []);

  // Render Functions
  const renderError = () => error && (
    <Alert variant="destructive" className={STYLES.ALERT}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const renderTabs = () => (
    <Tabs defaultValue={TAB_CONFIG.DEFAULT} className="w-full">
      <TabsList className={STYLES.TABS_LIST}>
        {TAB_CONFIG.ITEMS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={STYLES.TAB_TRIGGER}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TAB_CONFIG.ITEMS.map(({ value, component: Component }) => (
        <TabsContent key={value} value={value}>
          <Component
            setIsCreateAdOpen={setIsCreateAdOpen}
            contractAddress={value === "my-ads" ? contractAddress : undefined}
          />
        </TabsContent>
      ))}
    </Tabs>
  );

  return (
    <>
      {renderError()}
      {renderTabs()}

      <CreateAdDialog
        isOpen={isCreateAdOpen}
        setIsOpen={() => setIsCreateAdOpen(false)}
        createNewAd={createNewAd}
        isLoading={isLoading}
        newAdData={newAdData}
        setNewAdData={setNewAdData}
      />
    </>
  );
};

export default EnhancedAdManager;