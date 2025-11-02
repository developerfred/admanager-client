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
  const { data: currentAdData } = useReadContract({
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
    reset: resetWrite
  } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
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

  const handleOpenChange = useCallback((open: boolean) => {
    setIsCreateAdOpen(open);
    if (!open) {
      resetNewAdData();
    }
  }, [resetNewAdData]);

  const handleInputChange = useCallback((field: keyof NewAdData, value: string) => {
    setNewAdData(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  }, []);

  // Close dialog on success
  useEffect(() => {
    if (isSuccess) {
      setIsCreateAdOpen(false);
      resetNewAdData();
    }
  }, [isSuccess, resetNewAdData]);

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to access the Ad Manager
        </p>
        <Button
          onClick={() => open()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="lg"
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  const isLoading = isPending || isConfirming;
  const error = writeError || (validationError ? new Error(validationError) : null);

  return (
    <>
      {!contractAddress && (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <AlertTitle>Unsupported Network</AlertTitle>
          <AlertDescription>
            Please switch to a supported network to use all features.
            <button
              type="button"
              onClick={() => switchChain?.({ chainId: BASE_CHAIN_ID })}
              className="ml-2 underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              Switch to Base
            </button>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'An error occurred'}
          </AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your advertisement has been created successfully!
          </AlertDescription>
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
            currentAd={currentAd}
            isConnected={isConnected}
            onConnectWallet={() => open()}
          />
        </TabsContent>

        <TabsContent value="my-ads">
          <MyAds setIsCreateAdOpen={setIsCreateAdOpen} />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>

        <TabsContent value="community">
          <CommunityChallenge />
        </TabsContent>
      </Tabs>

      {/* Create Ad Dialog */}
      <Dialog open={isCreateAdOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[525px] bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
              Create New Advertisement
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Fill in the details for your new ad. Make it stand out!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="link" className="text-[#9AEDEF]">
                Link URL
              </Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={newAdData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="text-[#9AEDEF]">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={newAdData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="referrer" className="text-[#9AEDEF]">
                Referrer Address (Optional)
              </Label>
              <Input
                id="referrer"
                placeholder="0x..."
                value={newAdData.referrer}
                onChange={(e) => handleInputChange('referrer', e.target.value as Address)}
                className="bg-black/50 border-[#D365E3]/30 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            {nextAdPrice && (
              <div className="text-sm text-[#9AEDEF] bg-black/30 p-3 rounded-lg">
                <strong>Price:</strong> {(Number(nextAdPrice) / 1e18).toFixed(6)} ETH
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
              className="bg-transparent border-[#D365E3]/50 text-white hover:bg-[#D365E3]/20"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateAd}
              disabled={isLoading || !contractAddress}
              className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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