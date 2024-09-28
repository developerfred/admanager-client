import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Achievement {
    id: number;
    name: string;
    description: string;
    progress: number;
}

const achievements: Achievement[] = [
    { id: 1, name: "Ad Creator", description: "Create your first ad", progress: 100 },
    { id: 2, name: "Engagement Master", description: "Reach 1000 engagements", progress: 75 },
    { id: 3, name: "Referral Queen", description: "Refer 10 new advertisers", progress: 50 },
];

const Achievements: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => (
                <Card key={achievement.id} className="bg-black/50 backdrop-blur-md border-0">
                    <CardHeader>
                        <h3 className="text-xl font-bold text-[#9AEDEF]">{achievement.name}</h3>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm mb-2 text-white/80">{achievement.description}</p>
                        <Progress value={achievement.progress} className="w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default Achievements;