import type React from 'react';
import { useReadContract } from 'wagmi';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    ChevronRight,
    Trophy,
    Clock,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { useAppKitNetwork } from '@/hooks/useAppKitNetwork';
import { globalABI } from '@/config/abi';
import { formatEther } from 'viem';
import type { CurrentAd } from '@/config/contract';
import TopPerformingAds from '@/components/TopPerformingAds';

interface DashboardProps {
    setIsCreateAdOpen: (isOpen: boolean) => void;
    currentAd: CurrentAd | null;
    isConnected: boolean;
    onConnectWallet: () => void;
}

const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Dashboard: React.FC<DashboardProps> = ({
    setIsCreateAdOpen,
    currentAd,
    isConnected,
}) => {
    const { contractAddress } = useAppKitNetwork();

    // Read current chief
    const { data: chiefData } = useReadContract({
        address: contractAddress,
        abi: globalABI,
        functionName: 'getCurrentChief',
        query: {
            enabled: !!contractAddress,
        },
    });

    // Read current event
    const { data: eventData } = useReadContract({
        address: contractAddress,
        abi: globalABI,
        functionName: 'getCurrentEventInfo',
        query: {
            enabled: !!contractAddress,
        },
    });

    const chief = chiefData
        ? {
            address: chiefData[0],
            tokenBalance: chiefData[1],
            referralLevel: chiefData[2],
        }
        : null;

    const event = eventData
        ? {
            name: eventData[0],
            startTime: Number(eventData[1]),
            endTime: Number(eventData[2]),
            rewardMultiplier: Number(eventData[3]),
        }
        : null;

    const isEventActive = event && Date.now() / 1000 < event.endTime;

    if (!isConnected) {
        return (
            <Alert className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/50">
                <AlertDescription className="text-center text-lg">
                    Connect your wallet to view the dashboard
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Featured Ad Section */}
                <Card className="overflow-hidden bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-teal-900/50 backdrop-blur-md border-0 shadow-2xl">
                    <CardContent className="p-0">
                        <div className="relative">
                            <img
                                src={currentAd?.imageUrl || 'https://i.imgur.com/Ts32Art.jpeg'}
                                alt="Featured Ad"
                                className="w-full h-64 sm:h-80 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://i.imgur.com/Ts32Art.jpeg';
                                }}
                            />
                            {currentAd && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                                    <Star className="h-4 w-4 mr-2" /> Current Featured Ad
                                </div>
                            )}
                        </div>
                        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#D365E3]/20 to-[#9AEDEF]/20 backdrop-blur-sm">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                                Premium Ad Spot
                            </h2>
                            <p className="mb-6 text-white/90 text-base sm:text-lg leading-relaxed">
                                Boost your visibility! Showcase your product or service to our engaged audience and
                                watch your brand grow.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="flex-1 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 font-semibold py-6 text-lg shadow-lg"
                                    onClick={() => setIsCreateAdOpen(true)}
                                >
                                    Create Your Ad
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                                {currentAd && (
                                    <div className="flex items-center gap-2 px-4 py-3 bg-black/30 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-[#9AEDEF]" />
                                        <span className="text-white font-semibold">
                                            {currentAd.engagements.toString()} engagements
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Performing Ads */}
                <TopPerformingAds />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                {/* Chief of Advertising */}
                {chief && chief.address !== '0x0000000000000000000000000000000000000000' && (
                    <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-md border-0 shadow-xl">
                        <CardHeader>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center">
                                <Trophy className="mr-2 h-6 w-6 text-yellow-400" /> Chief of Advertising
                            </h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-black/30 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Address</p>
                                <p className="text-lg font-bold text-yellow-400">{formatAddress(chief.address)}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-black/30 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Tokens</p>
                                    <p className="text-lg font-bold text-[#9AEDEF]">
                                        {parseFloat(formatEther(chief.tokenBalance)).toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-4 bg-black/30 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Referrals</p>
                                    <p className="text-lg font-bold text-[#D365E3]">
                                        {chief.referralLevel.toString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Special Event */}
                {isEventActive && event && (
                    <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border-0 shadow-xl">
                        <CardHeader>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
                                <Zap className="mr-2 h-6 w-6 text-[#D365E3]" /> Special Event
                            </h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-[#D365E3] text-xl font-bold mb-2">{event.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        Ends:{' '}
                                        {new Date(event.endTime * 1000).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-black/30 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Reward Multiplier</p>
                                <p className="text-3xl font-bold text-[#9AEDEF]">{event.rewardMultiplier}%</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 font-semibold py-6">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Participate Now
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {/* Quick Stats */}
                <Card className="bg-black/50 backdrop-blur-md border-0 shadow-xl">
                    <CardHeader>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
                            <TrendingUp className="mr-2" /> Platform Stats
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#D365E3]/10 to-[#9AEDEF]/10 rounded-lg">
                                <span className="text-gray-300">Active Ads</span>
                                <span className="font-bold text-[#9AEDEF] text-lg">
                                    {currentAd ? '1+' : '0'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#D365E3]/10 to-[#9AEDEF]/10 rounded-lg">
                                <span className="text-gray-300">Total Engagements</span>
                                <span className="font-bold text-[#D365E3] text-lg">
                                    {currentAd ? currentAd.engagements.toString() : '0'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;