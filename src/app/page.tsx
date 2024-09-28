/* eslint-disable @typescript-eslint/no-explicit-any, */

'use client'
import React, { useState, useEffect } from 'react';
import { createPublicClient, http, createWalletClient, custom, Address, WalletClient } from 'viem';
import { base } from 'viem/chains';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Dashboard from '@/components/Dashboard';
import MyAds from '@/components/MyAds';
import Achievements from '@/components/Achievements';
import CommunityChallenge from '@/components/CommunityChallenge';
import CreateAdDialog from '@/components/CreateAdDialog';
import { admanangerABI, contractAddress, CurrentAd } from '@/lib/contract/config';

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.REACT_APP_RPC_URL),
});


type FlexibleProvider = {
  request: (...args: any[]) => Promise<any>;
  [key: string]: any;
};

const EnhancedAdManager: React.FC = () => {
  const [currentAd, setCurrentAd] = useState<CurrentAd | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isCreateAdOpen, setIsCreateAdOpen] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);  
  const [newAdData, setNewAdData] = useState<{
    link: string;
    imageUrl: string;
    referrer: Address;
  }>({
    link: '',
    imageUrl: '',
    referrer: '0x0000000000000000000000000000000000000000'
  });

  useEffect(() => {
    checkMetaMaskInstallation();
    loadBlockchainData();
  }, []);

  function checkMetaMaskInstallation(): void {
    const provider = typeof window !== 'undefined' ? window.ethereum : undefined;
    const isInstalled = !!provider?.isMetaMask;
    setIsMetaMaskInstalled(isInstalled);

    if (isInstalled && provider) {
      const flexibleProvider = provider as FlexibleProvider;

      const client = createWalletClient({
        chain: base,
        transport: custom(flexibleProvider)
      });
      setWalletClient(client);
    }
  }

  async function loadBlockchainData(): Promise<void> {
    setIsLoading(true);
    setError('');
    try {
      const [ad] = await Promise.all([
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: admanangerABI,
          functionName: 'getCurrentAd',
        }) as Promise<[string, string, bigint, Address, Address, boolean, bigint]>,
        publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: admanangerABI,
          functionName: 'getNextAdPrice',
        }) as Promise<bigint>
      ]);

      setCurrentAd({
        link: ad[0],
        imageUrl: ad[1],
        price: ad[2],
        advertiser: ad[3],
        referrer: ad[4],
        isActive: ad[5],
        engagements: ad[6]
      });
    } catch (error) {
      console.error("An error occurred:", error);
      setError('Failed to load blockchain data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }


  async function createNewAd(): Promise<void> {
    if (!isMetaMaskInstalled || !walletClient) {
      setError('Please install web3 wallet to create an ad.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const [address] = await walletClient.requestAddresses();
      const price = await publicClient.readContract({
        address: contractAddress,
        abi: admanangerABI,
        functionName: 'getNextAdPrice',
      }) as bigint;

      const { request } = await publicClient.simulateContract({
        account: address,
        address: contractAddress,
        abi: admanangerABI,
        functionName: 'createAdvertisement',
        args: [newAdData.link, newAdData.imageUrl, newAdData.referrer],
        value: price,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      await loadBlockchainData();
      setIsCreateAdOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setError('Failed to create ad. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }


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
          <TabsTrigger value="dashboard" className="rounded-full">Dashboard</TabsTrigger>
          <TabsTrigger value="my-ads" className="rounded-full">My Ads</TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-full">Achievements</TabsTrigger>
          <TabsTrigger value="community" className="rounded-full">Community</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard setIsCreateAdOpen={setIsCreateAdOpen} currentAd={currentAd} />
        </TabsContent>
        <TabsContent value="my-ads">
          <MyAds contractAddress={contractAddress} setIsCreateAdOpen={setIsCreateAdOpen} />
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
        setIsOpen={setIsCreateAdOpen}
        createNewAd={createNewAd}
        isLoading={isLoading}
        newAdData={newAdData}
        setNewAdData={setNewAdData}
      />
    </>
  );
};

export default EnhancedAdManager;