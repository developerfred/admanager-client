/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useMemo, useCallback, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThumbsUp, Loader2 } from 'lucide-react';
import { useAppKitNetwork } from '@/hooks/useAppKitNetwork';
import { globalABI } from '@/config/abi';
import type { Advertisement } from '@/config/contract';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100';

const TopPerformingAds: React.FC = () => {
    const { contractAddress, address: userAddress } = useAppKitNetwork();

    
    const { data: activeAdsData, refetch } = useReadContract({
        address: contractAddress,
        abi: globalABI,
        functionName: 'getActiveAds',
        args: [0n, 10n],
        query: {
            enabled: !!contractAddress,
        },
    });

    
    const {
        writeContract,
        data: hash,
        isPending,
        error: writeError,
    } = useWriteContract();

    
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    
    const topAds = useMemo(() => {
        if (!activeAdsData || !Array.isArray(activeAdsData[0])) return [];

        const ads = activeAdsData[0] as Advertisement[];

        // Sort by engagements (descending) and take top 3
        return ads
            .map((ad, index) => ({ ...ad, index }))
            .sort((a, b) => Number(b.engagements) - Number(a.engagements))
            .slice(0, 3);
    }, [activeAdsData]);

    const handleEngage = useCallback(
        (adIndex: number) => {
            if (!contractAddress) return;

            writeContract({
                address: contractAddress,
                abi: globalABI,
                functionName: 'recordEngagement',
                args: [BigInt(adIndex)],
            });
        },
        [contractAddress, writeContract]
    );

    // Refetch ads on success
    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);

    const isLoading = isPending || isConfirming;

    if (!contractAddress) {
        return (
            <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                    Top Performing Ads
                </h2>
                <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertDescription>
                        Please connect to a supported network to view ads.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!topAds.length) {
        return (
            <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                    Top Performing Ads
                </h2>
                <Card className="bg-black/50 backdrop-blur-md border-0">
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-400">No ads available yet. Be the first to create one!</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                Top Performing Ads
            </h2>

            {writeError && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                        {writeError instanceof Error ? writeError.message : 'Failed to engage with ad'}
                    </AlertDescription>
                </Alert>
            )}

            {isSuccess && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                    <AlertDescription>Successfully engaged with the ad!</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topAds.map((ad) => {
                    const isOwnAd = userAddress && ad.advertiser.toLowerCase() === userAddress.toLowerCase();
                    const canEngage = userAddress && !isOwnAd;

                    return (
                        <Card
                            key={ad.index}
                            className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <CardContent className="p-4">
                                <img
                                    src={ad.imageUrl || PLACEHOLDER_IMAGE}
                                    alt={ad.link}
                                    className="w-full h-32 object-cover mb-2 rounded"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = PLACEHOLDER_IMAGE;
                                    }}
                                />
                                <a
                                    href={ad.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-[#9AEDEF] mb-1 block hover:underline truncate"
                                >
                                    {ad.link}
                                </a>
                                <p className="text-sm text-[#D365E3] mb-2">
                                    {ad.engagements.toString()} engagements
                                </p>
                                <Button
                                    onClick={() => handleEngage(ad.index)}
                                    disabled={!canEngage || isLoading}
                                    className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Engaging...
                                        </>
                                    ) : (
                                        <>
                                            <ThumbsUp className="h-4 w-4 mr-2" />
                                            {isOwnAd ? 'Your Ad' : 'Engage'}
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default TopPerformingAds;