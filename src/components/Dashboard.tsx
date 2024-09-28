import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ThumbsUp, Trophy, Clock, Sparkles, Star } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { formatAddress } from '@/utils/formatters';

import { CurrentAd, TopAd, TopEngager, MockData } from '@/types';
import mockData from '@/data/mockData.json';


interface DashboardProps {
    setIsCreateAdOpen: (isOpen: boolean) => void; 
    currentAd: CurrentAd | null;
}

const Dashboard: React.FC<DashboardProps> = ({ setIsCreateAdOpen, currentAd }) => {
    const { topAds, topEngagers, specialEvent, setTopAds, setTopEngagers, setSpecialEvent } = useDashboardStore();

    useEffect(() => {
        const fetchDashboardData = async () => {
            const data = mockData as MockData;

            const transformedAds: TopAd[] = data.topAds.map(ad => ({
                ...ad,
                engagements: Number(ad.engagements)
            }));
            setTopAds(transformedAds);

            const transformedEngagers: TopEngager[] = data.topEngagers.map(engager => ({
                ...engager,
                id: Number(engager.id)
            }));
            setTopEngagers(transformedEngagers);

            setSpecialEvent(data.specialEvent);
        };

        fetchDashboardData();
    }, [setTopAds, setTopEngagers, setSpecialEvent]);

    const renderAdCard = (ad: TopAd | CurrentAd, isCurrentAd: boolean = false) => {
        const engagements = typeof ad.engagements === 'bigint' ? ad.engagements.toString() : ad.engagements.toString();
        const image = 'image' in ad ? ad.image : ad.imageUrl;
        const title = 'title' in ad ? ad.title : "Featured Ad";

        return (
            <Card key={('id' in ad ? ad.id : 'current').toString()} className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-4">
                    <div className="relative">
                        <img src={image} alt={title} className="w-full h-32 object-cover mb-2 rounded" />
                        {isCurrentAd && (
                            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                                <Star className="h-3 w-3 mr-1" /> Current
                            </div>
                        )}
                    </div>
                    <h3 className="font-bold text-[#9AEDEF] mb-1">{title}</h3>
                    <p className="text-sm text-[#D365E3] mb-2">{engagements} engagements</p>
                    <Button
                        className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 transition-all duration-300"
                    >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Engage
                    </Button>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
                    <CardContent className="p-0">
                        <img src={currentAd ? currentAd.imageUrl : "https://i.imgur.com/Ts32Art.jpeg"} alt="Featured Ad" className="w-full h-48 sm:h-64 object-cover" />
                        <div className="p-4 sm:p-6 bg-gradient-to-br from-[#D365E3]/20 to-[#9AEDEF]/20 backdrop-blur-sm">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                                Premium Ad Spot
                            </h2>
                            <p className="mb-4 text-white/80 text-sm sm:text-base">
                                Boost your visibility! Showcase your product or service to our engaged audience.
                            </p>
                            <Button className="w-full sm:w-auto bg-white text-black hover:bg-[#D365E3] transition-colors duration-300" onClick={() => setIsCreateAdOpen(true)}>
                                Create Your Ad
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
                        <Trophy className="mr-2" /> Top Performing Ads
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentAd && renderAdCard(currentAd, true)}
                        {topAds.slice(0, currentAd ? 2 : 3).map(ad => renderAdCard(ad))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#9AEDEF]/20">
                    <CardHeader>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
                            <Sparkles className="mr-2" /> Top Engaging Wallets
                        </h2>
                    </CardHeader>
                    <CardContent>
                        {topEngagers.map((engager, index) => (
                            <div key={engager.id} className={`flex justify-between items-center ${index !== 0 ? 'border-t border-[#333]' : ''} py-2`}>
                                <span className="text-[#D365E3]">{formatAddress(engager.address)}</span>
                                <span className="font-bold text-[#9AEDEF]">{engager.engagements.toLocaleString()} engagements</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
                    <CardHeader>
                        <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
                            <Clock className="mr-2" /> Special Event
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <p className="text-[#D365E3] mb-2 font-semibold">{specialEvent.title}</p>
                        <p className="text-sm text-white/80 mb-2">{specialEvent.description}</p>
                        <p className="text-xs text-[#9AEDEF]">Ends on: {new Date(specialEvent.endDate).toLocaleDateString()}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">Participate Now</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;