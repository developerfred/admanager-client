export type CurrentAd = {
    link: string;
    imageUrl: string;
    price: bigint;
    advertiser: `0x${string}`;
    referrer: `0x${string}`;
    isActive: boolean;
    engagements: bigint;
};

export interface TopAd {
    id: number;
    title: string;
    engagements: number;
    image: string;
}

export interface TopEngager {
    id: number;
    address: string;
    engagements: number;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    progress: number;
}

export interface CommunityChallenge {
    description: string;
    goal: number;
    currentProgress: number;
    reward: number;
    deadline: string;
}
