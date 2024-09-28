import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SpecialEvent: React.FC = () => (
    <Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
        <CardHeader>
            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Special Event</h2>
        </CardHeader>
        <CardContent>
            <p className="text-[#D365E3] mb-2">Double Rewards Weekend!</p>
            <p className="text-sm text-white/80">Engage with ads this weekend to earn double the usual rewards.</p>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">Participate Now</Button>
        </CardFooter>
    </Card>
);

export default SpecialEvent;