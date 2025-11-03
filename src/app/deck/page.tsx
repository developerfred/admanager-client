'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ChevronRight,
    ChevronLeft,
    Trophy,
    TrendingUp,
    Users,
    Zap,
    Shield,
    Globe,
    DollarSign,
    Target,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    ExternalLink,
    Star
} from 'lucide-react';

const SLIDES = [
    {
        id: 'cover',
        title: 'AdManager',
        subtitle: 'Revolutionizing Digital Advertising in the Web3 Era',
        type: 'cover'
    },
    {
        id: 'problem',
        title: 'The Problem',
        type: 'content'
    },
    {
        id: 'solution',
        title: 'Our Solution',
        type: 'content'
    },
    {
        id: 'how-it-works',
        title: 'How It Works',
        type: 'content'
    },
    {
        id: 'business-model',
        title: 'Business Model',
        type: 'content'
    },
    {
        id: 'token-economics',
        title: 'Token Economics',
        type: 'content'
    },
    {
        id: 'gamification',
        title: 'Gamification Layer',
        type: 'content'
    },
    {
        id: 'traction',
        title: 'Traction & Recognition',
        type: 'content'
    },
    {
        id: 'market',
        title: 'Market Opportunity',
        type: 'content'
    },
    {
        id: 'technology',
        title: 'Technology Stack',
        type: 'content'
    },
    {
        id: 'roadmap',
        title: 'Roadmap',
        type: 'content'
    },
    {
        id: 'team',
        title: 'Team',
        type: 'content'
    },
    {
        id: 'ask',
        title: 'The Ask',
        type: 'content'
    }
];

const InvestorDeck: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < SLIDES.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const renderSlide = () => {
        const slide = SLIDES[currentSlide];

        switch (slide.id) {
            case 'cover':
                return (
                    <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center">
                            <Zap className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            AdManager
                        </h1>
                        <p className="text-3xl text-gray-300 max-w-3xl">
                            Revolutionizing Digital Advertising in the Web3 Era
                        </p>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 rounded-full border border-yellow-500/50">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <span className="text-yellow-500 font-bold">Reown Hackathon Winner</span>
                            </div>
                        </div>
                        <p className="text-xl text-gray-400 mt-4">
                            $1,200 in Prize Money Secured
                        </p>
                    </div>
                );

            case 'problem':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            The Problem
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            <Card className="bg-red-500/10 border-red-500/50">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-red-400 mb-4">Traditional Advertising</h3>
                                    <ul className="space-y-4 text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>Centralized platforms control pricing and visibility</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>High costs with no guaranteed engagement</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>No direct rewards for users who engage</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span>Lack of transparency in metrics and ROI</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-orange-500/10 border-orange-500/50">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-orange-400 mb-4">Market Gap</h3>
                                    <ul className="space-y-4 text-gray-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">!</span>
                                            <span>$600B+ global digital ad market dominated by intermediaries</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">!</span>
                                            <span>Users generate value but receive no compensation</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">!</span>
                                            <span>Limited innovation in engagement mechanics</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-orange-500 mt-1">!</span>
                                            <span>No blockchain solution with proven traction</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'solution':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Our Solution
                        </h2>
                        <p className="text-2xl text-gray-300 leading-relaxed">
                            A decentralized advertising ecosystem where advertisers reach engaged audiences,
                            and users are rewarded for their attention and interactions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                                        <DollarSign className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Fair Pricing</h3>
                                    <p className="text-gray-300">
                                        Dynamic pricing model that increases by 5% per ad, ensuring fairness and preventing spam
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">User Rewards</h3>
                                    <p className="text-gray-300">
                                        Users earn tokens for engaging with advertisements, creating genuine incentive alignment
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Transparent</h3>
                                    <p className="text-gray-300">
                                        All transactions on-chain with verifiable metrics and complete transparency
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'how-it-works':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            How It Works
                        </h2>
                        <div className="space-y-6 mt-12">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Advertisers Create Ads</h3>
                                    <p className="text-gray-300 text-lg">
                                        Pay in ETH/native tokens. Price increases 5% per ad to ensure quality and prevent spam.
                                        Optional referral system provides 10% discount when referred by existing users.
                                    </p>
                                </div>
                            </div>

                            <ArrowRight className="w-8 h-8 text-[#9AEDEF] mx-auto" />

                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Users Engage</h3>
                                    <p className="text-gray-300 text-lg">
                                        Browse and interact with advertisements. Each engagement is tracked on-chain.
                                        Users can engage once per ad, with a 24-hour cooldown between engagements for rewards.
                                    </p>
                                </div>
                            </div>

                            <ArrowRight className="w-8 h-8 text-[#9AEDEF] mx-auto" />

                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Earn Rewards</h3>
                                    <p className="text-gray-300 text-lg">
                                        Receive AdTokens for engagement. Rewards scale with user level.
                                        Level up by accumulating engagements. Participate in challenges and events for bonus rewards.
                                    </p>
                                </div>
                            </div>

                            <ArrowRight className="w-8 h-8 text-[#9AEDEF] mx-auto" />

                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full flex items-center justify-center text-black font-bold text-xl">
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Become Chief</h3>
                                    <p className="text-gray-300 text-lg">
                                        Top token holders and referrers can claim "Chief of Advertising" status,
                                        earning 5% of all engagement rewards platform-wide.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'business-model':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Business Model
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card className="bg-black/50 border-[#D365E3]/50">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-[#D365E3] mb-6">Revenue Streams</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Advertisement Fees</h4>
                                            <p className="text-gray-300">
                                                5% increase per ad creates sustainable revenue growth.
                                                Starting at 0.0003 ETH, scaling exponentially.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Premium Features</h4>
                                            <p className="text-gray-300">
                                                Featured placements, analytics dashboard, priority support for advertisers.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Platform Token</h4>
                                            <p className="text-gray-300">
                                                AdToken utility drives ecosystem value and creates deflationary pressure.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/50 border-[#9AEDEF]/50">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-[#9AEDEF] mb-6">Value Proposition</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">For Advertisers</h4>
                                            <ul className="text-gray-300 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Guaranteed visibility and engagement</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Transparent, verifiable metrics</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Direct access to engaged audience</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">For Users</h4>
                                            <ul className="text-gray-300 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Earn rewards for attention</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Gamified experience</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Ownership through tokens</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'token-economics':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Token Economics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-0">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-white mb-6">AdToken Utility</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-2 h-2 bg-[#D365E3] rounded-full mt-2"></div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-white">Engagement Rewards</h4>
                                                <p className="text-gray-300">Base: 2 tokens per engagement, scaling with level</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-2 h-2 bg-[#9AEDEF] rounded-full mt-2"></div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-white">Referral Bonuses</h4>
                                                <p className="text-gray-300">Multi-level rewards up to 5 levels deep</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-2 h-2 bg-[#D365E3] rounded-full mt-2"></div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-white">Achievement Unlocks</h4>
                                                <p className="text-gray-300">Bonus tokens for reaching milestones</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-2 h-2 bg-[#9AEDEF] rounded-full mt-2"></div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-white">Chief Benefits</h4>
                                                <p className="text-gray-300">5% of all platform rewards</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 border-0">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-white mb-6">Token Mechanics</h3>
                                    <div className="space-y-6">
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Supply Model</p>
                                            <p className="text-2xl font-bold text-white">Controlled Minting</p>
                                            <p className="text-gray-300 text-sm mt-2">No pre-mine, tokens minted as rewards</p>
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Distribution</p>
                                            <p className="text-2xl font-bold text-white">100% Community</p>
                                            <p className="text-gray-300 text-sm mt-2">All tokens earned through platform usage</p>
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Future Utility</p>
                                            <p className="text-2xl font-bold text-white">Governance + Staking</p>
                                            <p className="text-gray-300 text-sm mt-2">DAO voting and yield generation</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'gamification':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Gamification Layer
                        </h2>
                        <p className="text-2xl text-gray-300">
                            Driving engagement through game mechanics and social competition
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/50">
                                <CardContent className="p-6">
                                    <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-3">Achievements</h3>
                                    <p className="text-gray-300">
                                        Unlock badges and earn bonus tokens for reaching milestones:
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                                        <li>• First Ad Created</li>
                                        <li>• 100 Engagements</li>
                                        <li>• 10 Referrals</li>
                                        <li>• Chief Status</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
                                <CardContent className="p-6">
                                    <TrendingUp className="w-12 h-12 text-purple-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-3">Leveling System</h3>
                                    <p className="text-gray-300">
                                        Progress through levels based on total engagements:
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                                        <li>• Level up every 10 engagements</li>
                                        <li>• Higher levels = more rewards</li>
                                        <li>• Unlock exclusive features</li>
                                        <li>• Public leaderboard</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/50">
                                <CardContent className="p-6">
                                    <Sparkles className="w-12 h-12 text-blue-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-3">Special Events</h3>
                                    <p className="text-gray-300">
                                        Participate in limited-time challenges:
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                                        <li>• 2x Reward Weekends</li>
                                        <li>• Community Goals</li>
                                        <li>• Bonus Token Drops</li>
                                        <li>• Seasonal Campaigns</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'traction':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Traction & Recognition
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/50">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Trophy className="w-16 h-16 text-yellow-500" />
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">Hackathon Winner</h3>
                                            <p className="text-yellow-400">Reown Hackathon 2024</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-lg mb-4">
                                        Selected from hundreds of submissions for innovation in Web3 advertising
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            <span className="text-white">$1,200 Prize Money</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            <span className="text-white">Official Recognition</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            <span className="text-white">Community Validation</span>
                                        </div>
                                    </div>
                                    <a
                                        href="https://x.com/reown_/status/1851297801059336372"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-6 text-yellow-400 hover:text-yellow-300 transition-colors"
                                    >
                                        View Announcement
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-white mb-6">MVP Status</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-semibold text-[#D365E3] mb-2">Completed</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span>Smart contracts audited (95%+ test coverage)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span>Multi-chain deployment ready (14 networks)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span>Frontend dApp functional</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span>Token economics designed</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-[#9AEDEF] mb-2">Recognition</h4>
                                            <ul className="space-y-2 text-gray-300">
                                                <li className="flex items-center gap-2">
                                                    <Star className="w-5 h-5 text-yellow-500" />
                                                    <span>Featured on Karma GAP</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Star className="w-5 h-5 text-yellow-500" />
                                                    <span>Community interest growing</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'market':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Market Opportunity
                        </h2>
                        <div className="space-y-8 mt-12">
                            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-0">
                                <CardContent className="p-8">
                                    <h3 className="text-4xl font-bold text-white mb-6">$600B+ Global Digital Ad Market</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-[#D365E3] mb-2">$600B+</p>
                                            <p className="text-gray-300">Total Addressable Market</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-[#9AEDEF] mb-2">$50B+</p>
                                            <p className="text-gray-300">Web3/Crypto Advertising</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-[#D365E3] mb-2">15%</p>
                                            <p className="text-gray-300">Annual Growth Rate</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-black/50 border-[#D365E3]/50">
                                    <CardContent className="p-6">
                                        <Target className="w-12 h-12 text-[#D365E3] mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-4">Target Audience</h3>
                                        <ul className="space-y-3 text-gray-300">
                                            <li>• Web3 projects seeking visibility</li>
                                            <li>• Crypto-native users (300M+ globally)</li>
                                            <li>• NFT projects and communities</li>
                                            <li>• DeFi protocols</li>
                                            <li>• Traditional brands entering Web3</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-black/50 border-[#9AEDEF]/50">
                                    <CardContent className="p-6">
                                        <Globe className="w-12 h-12 text-[#9AEDEF] mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-4">Competitive Advantage</h3>
                                        <ul className="space-y-3 text-gray-300">
                                            <li>• First-mover in decentralized ads</li>
                                            <li>• Proven MVP with hackathon win</li>
                                            <li>• Fair, transparent pricing model</li>
                                            <li>• Engaged community from day one</li>
                                            <li>• Multi-chain from the start</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                );

            case 'technology':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Technology Stack
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <Card className="bg-black/50 border-[#D365E3]/50">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-[#D365E3] mb-6">Smart Contracts</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Solidity 0.8.20</h4>
                                            <p className="text-gray-300">Latest security features and optimizations</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">OpenZeppelin</h4>
                                            <p className="text-gray-300">Battle-tested security libraries</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Foundry</h4>
                                            <p className="text-gray-300">Modern development framework</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">PRB-Math</h4>
                                            <p className="text-gray-300">Precise fixed-point mathematics</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/50 border-[#9AEDEF]/50">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-[#9AEDEF] mb-6">Frontend Stack</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Next.js 14</h4>
                                            <p className="text-gray-300">React framework with App Router</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Wagmi v2</h4>
                                            <p className="text-gray-300">Modern Web3 React hooks</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">Reown AppKit</h4>
                                            <p className="text-gray-300">Multi-wallet connection</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2">TailwindCSS</h4>
                                            <p className="text-gray-300">Modern, responsive design</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/50 border-purple-500/50 md:col-span-2">
                                <CardContent className="p-8">
                                    <h3 className="text-3xl font-bold text-white mb-6">Security & Testing</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <Shield className="w-12 h-12 text-green-500 mb-4" />
                                            <h4 className="text-xl font-semibold text-white mb-2">95%+ Coverage</h4>
                                            <p className="text-gray-300">Comprehensive test suite with edge cases</p>
                                        </div>
                                        <div>
                                            <Shield className="w-12 h-12 text-blue-500 mb-4" />
                                            <h4 className="text-xl font-semibold text-white mb-2">Audited Code</h4>
                                            <p className="text-gray-300">All vulnerabilities identified and fixed</p>
                                        </div>
                                        <div>
                                            <Shield className="w-12 h-12 text-purple-500 mb-4" />
                                            <h4 className="text-xl font-semibold text-white mb-2">Gas Optimized</h4>
                                            <p className="text-gray-300">Efficient execution via IR compilation</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'roadmap':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Roadmap
                        </h2>
                        <div className="space-y-6 mt-12">
                            <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                        <h3 className="text-2xl font-bold text-white">Phase 1: Foundation (Complete)</h3>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 ml-12">
                                        <li>✓ Smart contract development</li>
                                        <li>✓ Security audit</li>
                                        <li>✓ MVP deployment</li>
                                        <li>✓ Hackathon win</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                        <h3 className="text-2xl font-bold text-white">Phase 2: Launch (Q1 2025)</h3>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 ml-12">
                                        <li>• Testnet deployment</li>
                                        <li>• External audit</li>
                                        <li>• Beta testing program</li>
                                        <li>• Mainnet launch</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                        <h3 className="text-2xl font-bold text-white">Phase 3: Growth (Q2-Q3 2025)</h3>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 ml-12">
                                        <li>• DAO governance</li>
                                        <li>• NFT ad support</li>
                                        <li>• Mobile app</li>
                                        <li>• Partnership program</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/50">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                                        <h3 className="text-2xl font-bold text-white">Phase 4: Scale (Q4 2025+)</h3>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300 ml-12">
                                        <li>• Cross-chain expansion</li>
                                        <li>• Enterprise features</li>
                                        <li>• API marketplace</li>
                                        <li>• Global partnerships</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case 'team':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            Team
                        </h2>
                        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-0 mt-12">
                            <CardContent className="p-12">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] rounded-full mb-6"></div>
                                    <h3 className="text-4xl font-bold text-white mb-2">codingsh</h3>
                                    <p className="text-2xl text-[#9AEDEF] mb-6">Founder & Lead Developer</p>
                                    <p className="text-gray-300 text-lg max-w-2xl mb-8">
                                        Blockchain developer and smart contract security specialist with a proven track record
                                        in building innovative Web3 solutions. Winner of the Reown Hackathon with AdManager.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Experience</p>
                                            <p className="text-2xl font-bold text-white">3+ Years</p>
                                            <p className="text-gray-300 text-sm">Smart Contract Dev</p>
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Projects</p>
                                            <p className="text-2xl font-bold text-white">10+</p>
                                            <p className="text-gray-300 text-sm">Deployed dApps</p>
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Recognition</p>
                                            <p className="text-2xl font-bold text-white">🏆</p>
                                            <p className="text-gray-300 text-sm">Hackathon Winner</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <a
                                            href="https://github.com/developerfred"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-[#9AEDEF] transition-colors"
                                        >
                                            GitHub
                                        </a>
                                        <span className="text-gray-600">•</span>
                                        <a
                                            href="https://twitter.com/codingsh"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-[#9AEDEF] transition-colors"
                                        >
                                            Twitter
                                        </a>                                        
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-black/50 border-[#D365E3]/50">
                            <CardContent className="p-8">
                                <h3 className="text-3xl font-bold text-white mb-6 text-center">Looking to Expand</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <Users className="w-12 h-12 text-[#D365E3] mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2">Marketing Lead</h4>
                                        <p className="text-gray-300">Growth & Community</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-12 h-12 text-[#9AEDEF] mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2">Frontend Developer</h4>
                                        <p className="text-gray-300">React/Web3 Expert</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-12 h-12 text-[#D365E3] mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2">BD Manager</h4>
                                        <p className="text-gray-300">Partnerships & Sales</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );

            case 'ask':
                return (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            The Ask
                        </h2>
                        <Card className="bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-teal-900/50 border-0 mt-12">
                            <CardContent className="p-12">
                                <div className="text-center mb-12">
                                    <p className="text-6xl font-bold text-white mb-4">Seeking $150K</p>
                                    <p className="text-2xl text-gray-300">Seed Round for Platform Launch</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#D365E3] mb-6">Use of Funds</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                                                <span className="text-white font-semibold">Development & Audit</span>
                                                <span className="text-[#9AEDEF] font-bold">40%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                                                <span className="text-white font-semibold">Marketing & Growth</span>
                                                <span className="text-[#9AEDEF] font-bold">30%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                                                <span className="text-white font-semibold">Team Expansion</span>
                                                <span className="text-[#9AEDEF] font-bold">20%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                                                <span className="text-white font-semibold">Operations & Legal</span>
                                                <span className="text-[#9AEDEF] font-bold">10%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold text-[#9AEDEF] mb-6">12-Month Milestones</h3>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-black/30 rounded-lg">
                                                <p className="text-white font-semibold mb-2">Month 3</p>
                                                <p className="text-gray-300">Mainnet launch on 5 chains</p>
                                            </div>
                                            <div className="p-4 bg-black/30 rounded-lg">
                                                <p className="text-white font-semibold mb-2">Month 6</p>
                                                <p className="text-gray-300">1,000 active advertisers</p>
                                            </div>
                                            <div className="p-4 bg-black/30 rounded-lg">
                                                <p className="text-white font-semibold mb-2">Month 9</p>
                                                <p className="text-gray-300">50,000 engaged users</p>
                                            </div>
                                            <div className="p-4 bg-black/30 rounded-lg">
                                                <p className="text-white font-semibold mb-2">Month 12</p>
                                                <p className="text-gray-300">$1M+ in ad revenue</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/30 p-8 rounded-lg">
                                    <h3 className="text-3xl font-bold text-white mb-6 text-center">Why Invest Now?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                                            <p className="text-white font-semibold mb-2">Proven Concept</p>
                                            <p className="text-gray-300 text-sm">Hackathon-winning MVP</p>
                                        </div>
                                        <div className="text-center">
                                            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                            <p className="text-white font-semibold mb-2">Growing Market</p>
                                            <p className="text-gray-300 text-sm">$600B+ opportunity</p>
                                        </div>
                                        <div className="text-center">
                                            <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                            <p className="text-white font-semibold mb-2">First Mover</p>
                                            <p className="text-gray-300 text-sm">Unique positioning</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center mt-12">
                            <h3 className="text-3xl font-bold text-white mb-6">Let's Build the Future Together</h3>
                            <p className="text-xl text-gray-300 mb-8">
                                Ready to revolutionize advertising? Let's talk.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 font-semibold px-8 py-6 text-lg">
                                    Schedule a Call
                                    <ChevronRight className="ml-2" />
                                </Button>
                                <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg">
                                    View Pitch Deck PDF
                                    <ExternalLink className="ml-2" />
                                </Button>
                            </div>
                            <p className="text-gray-400 mt-8">
                                contact@admanager.xyz • @codingsh on Twitter
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                            AdManager
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                                {currentSlide + 1} / {SLIDES.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="min-h-[600px] py-12">
                        {renderSlide()}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-12">
                        <Button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="mr-2" />
                            Previous
                        </Button>

                        {/* Slide Indicators */}
                        <div className="flex gap-2">
                            {SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                            ? 'bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] w-8'
                                            : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            onClick={nextSlide}
                            disabled={currentSlide === SLIDES.length - 1}
                            className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorDeck;