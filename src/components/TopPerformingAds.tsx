/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';

interface TopAd {
    id: number;
    title: string;
    engagements: number;
    image: string;
}

const topAds: TopAd[] = [
    { id: 1, title: "Girl Power Merch", engagements: 15000, image: "https://via.placeholder.com/100" },
    { id: 2, title: "Retro Phone Cases", engagements: 12000, image: "https://via.placeholder.com/100" },
    { id: 3, title: "Neon Vibes Only", engagements: 10000, image: "https://via.placeholder.com/100" },
];

const TopPerformingAds: React.FC = () => (
    <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Top Performing Ads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAds.map(ad => (
                <Card key={ad.id} className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-4">
                        <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover mb-2 rounded" />
                        <h3 className="font-bold text-[#9AEDEF] mb-1">{ad.title}</h3>
                        <p className="text-sm text-[#D365E3] mb-2">{ad.engagements} engagements</p>
                        <Button
                            className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 transition-all duration-300"
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Engage
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default TopPerformingAds;