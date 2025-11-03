'use client';

import type React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import MyAds from '@/components/MyAds';
import Achievements from '@/components/Achievements';
import CommunityChallenge from '@/components/CommunityChallenge';
import { useAppKitNetwork } from '@/hooks/useAppKitNetwork';
import { globalABI } from '@/config/abi';
import type { Address } from 'viem';
import type { CurrentAd } from '@/config/contract';

interface NewAdData {
  link: string;
  imageUrl: string;
  referrer: Address;
}

const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';
const BASE_CHAIN_ID = 8453;

const ERROR_MESSAGES = {
  contractNotDeployed: 'Contract not deployed on this network',
  invalidUrl: 'Please enter a valid URL',
  invalidImageUrl: 'Please enter a valid image URL',
} as const;

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const EnhancedAdManager: React.FC = () => {
  const { open } = useAppKit();
  const { isConnected, contractAddress, switchChain } = useAppKitNetwork();

  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [newAdData, setNewAdData] = useState<NewAdData>({
    link: '',
    imageUrl: '',
    referrer: ZERO_ADDRESS,
  });
  const [validationError, setValidationError] = useState('');

  // Read current ad
  const { data: currentAdData, refetch: refetchCurrentAd } = useReadContract({
    address: contractAddress,
    abi: globalABI,
    functionName: 'getCurrentAd',
    query: {
      enabled: !!contractAddress,
    },
  });

  // Read next ad price
  const { data: nextAdPrice } = useReadContract({
    address: contractAddress,
    abi: globalABI,
    functionName: 'getNextAdPrice',
    query: {
      enabled: !!contractAddress,
    },
  });

  // Write contract hook
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const currentAd = useMemo<CurrentAd | null>(() => {
    if (!currentAdData) return null;

    return {
      link: currentAdData[0],
      imageUrl: currentAdData[1],
      price: currentAdData[2],
      advertiser: currentAdData[3] as Address,
      referrer: currentAdData[4] as Address,
      isActive: currentAdData[5],
      engagements: currentAdData[6],
    };
  }, [currentAdData]);

  const resetNewAdData = useCallback(() => {
    setNewAdData({
      link: '',
      imageUrl: '',
      referrer: ZERO_ADDRESS,
    });
    setValidationError('');
    resetWrite();
  }, [resetWrite]);

  const validateAdData = useCallback((): boolean => {
    if (!newAdData.link.trim()) {
      setValidationError('Link is required');
      return false;
    }

    if (!isValidUrl(newAdData.link)) {
      setValidationError(ERROR_MESSAGES.invalidUrl);
      return false;
    }

    if (!newAdData.imageUrl.trim()) {
      setValidationError('Image URL is required');
      return false;
    }

    if (!isValidUrl(newAdData.imageUrl)) {
      setValidationError(ERROR_MESSAGES.invalidImageUrl);
      return false;
    }

    setValidationError('');
    return true;
  }, [newAdData]);

  const handleCreateAd = useCallback(() => {
    if (!contractAddress) {
      setValidationError(ERROR_MESSAGES.contractNotDeployed);
      return;
    }

    if (!validateAdData()) return;

    writeContract({
      address: contractAddress,
      abi: globalABI,
      functionName: 'createAdvertisement',
      args: [newAdData.link, newAdData.imageUrl, newAdData.referrer],
      value: nextAdPrice as bigint,
    });
  }, [contractAddress, validateAdData, writeContract, newAdData, nextAdPrice]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsCreateAdOpen(open);
      if (!open) {
        resetNewAdData();
      }
    },
    [resetNewAdData]
  );

  const handleInputChange = useCallback((field: keyof NewAdData, value: string) => {
    setNewAdData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  }, []);

  // Close dialog and refetch on success
  useEffect(() => {
    if (isSuccess) {
      setIsCreateAdOpen(false);
      resetNewAdData();
      refetchCurrentAd();
    }
  }, [isSuccess, resetNewAdData, refetchCurrentAd]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the Ad Manager and start creating engaging
            advertisements
          </p>
          <Button
            onClick={() => open()}
            className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 font-semibold px-8 py-6 text-lg"
            size="lg"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  const isLoading = isPending || isConfirming;
  const error = writeError || (validationError ? new Error(validationError) : null);

  return (
    <>
      {!contractAddress && (
        <Alert className="mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/50">
          <AlertTitle className="text-yellow-600 font-bold">Unsupported Network</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Please switch to a supported network to use all features.
            <button
              type="button"
              onClick={() => switchChain?.({ chainId: BASE_CHAIN_ID })}
              className="ml-2 underline text-yellow-800 hover:text-yellow-900 font-semibold transition-colors"
            >
              Switch to Base
            </button>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-2">
          <AlertTitle className="font-bold">Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'An error occurred'}
          </AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/50 animate-in fade-in slide-in-from-top-2">
          <AlertTitle className="text-green-700 font-bold">Success!</AlertTitle>
          <AlertDescription className="text-green-600">
            Your advertisement has been created successfully! 🎉
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-black/50 backdrop-blur-md rounded-full p-1 shadow-lg">
          <TabsTrigger
            value="dashboard"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D365E3] data-[state=active]:to-[#9AEDEF] data-[state=active]:text-black transition-all"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="my-ads"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D365E3] data-[state=active]:to-[#9AEDEF] data-[state=active]:text-black transition-all"
          >
            My Ads
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D365E3] data-[state=active]:to-[#9AEDEF] data-[state=active]:text-black transition-all"
          >
            Achievements
          </TabsTrigger>
          <TabsTrigger
            value="community"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D365E3] data-[state=active]:to-[#9AEDEF] data-[state=active]:text-black transition-all"
          >
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-4">
          <Dashboard
            setIsCreateAdOpen={setIsCreateAdOpen}
            currentAd={currentAd}
            isConnected={isConnected}
            onConnectWallet={() => open()}
          />
        </TabsContent>

        <TabsContent value="my-ads" className="animate-in fade-in slide-in-from-bottom-4">
          <MyAds setIsCreateAdOpen={setIsCreateAdOpen} />
        </TabsContent>

        <TabsContent value="achievements" className="animate-in fade-in slide-in-from-bottom-4">
          <Achievements />
        </TabsContent>

        <TabsContent value="community" className="animate-in fade-in slide-in-from-bottom-4">
          <CommunityChallenge />
        </TabsContent>
      </Tabs>

      {/* Create Ad Dialog */}
      <Dialog open={isCreateAdOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[550px] bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
              Create New Advertisement
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              Fill in the details for your new ad. Make it stand out and engage your audience!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="link" className="text-[#9AEDEF] font-semibold text-base">
                Link URL *
              </Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={newAdData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-500 focus:border-[#D365E3] transition-colors h-12"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="imageUrl" className="text-[#9AEDEF] font-semibold text-base">
                Image URL *
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={newAdData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-500 focus:border-[#D365E3] transition-colors h-12"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="referrer" className="text-[#9AEDEF] font-semibold text-base">
                Referrer Address <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="referrer"
                placeholder="0x..."
                value={newAdData.referrer}
                onChange={(e) => handleInputChange('referrer', e.target.value as Address)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-500 focus:border-[#D365E3] transition-colors h-12"
                disabled={isLoading}
              />
            </div>

            {nextAdPrice && (
              <div className="text-base text-[#9AEDEF] bg-black/30 p-4 rounded-lg border border-[#D365E3]/20">
                <strong>Price:</strong> {(Number(nextAdPrice) / 1e18).toFixed(6)} ETH
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
              className="bg-transparent border-[#D365E3]/50 text-white hover:bg-[#D365E3]/20 h-12"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateAd}
              disabled={isLoading || !contractAddress}
              className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 font-semibold h-12 px-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isPending ? 'Confirming...' : 'Creating...'}
                </>
              ) : (
                'Create Ad'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedAdManager;