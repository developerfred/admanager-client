import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface TopEngager {
    id: number;
    address: string;
    engagements: number;
}

const topEngagers: TopEngager[] = [
    { id: 1, address: "0x1234...5678", engagements: 5000 },
    { id: 2, address: "0x5678...9012", engagements: 4500 },
    { id: 3, address: "0x9012...3456", engagements: 4000 },
];

const TopEngagingWallets: React.FC = () => (
    <Card className="mb-8 bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#9AEDEF]/20">
        <CardHeader>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Top Engaging Wallets</h2>
        </CardHeader>
        <CardContent>
            {topEngagers.map((engager, index) => (
                <div key={engager.id} className={`flex justify-between items-center ${index !== 0 ? 'border-t border-[#333]' : ''} py-2`}>
                    <span className="text-[#D365E3]">{engager.address}</span>
                    <span className="font-bold text-[#9AEDEF]">{engager.engagements} engagements</span>
                </div>
            ))}
        </CardContent>
    </Card>

);

export default TopEngagingWallets;