import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrentAd, TopAd, TopEngager } from '@/types';

interface DashboardState {
    currentAd: CurrentAd | null;
    topAds: TopAd[];
    topEngagers: TopEngager[];
    specialEvent: {
        title: string;
        description: string;
        endDate: string;
    };
    setCurrentAd: (ad: CurrentAd | null) => void;
    setTopAds: (ads: TopAd[]) => void;
    setTopEngagers: (engagers: TopEngager[]) => void;
    setSpecialEvent: (event: { title: string; description: string; endDate: string }) => void;
}


export const useDashboardStore = create(
    persist<DashboardState>(
        (set) => ({
            currentAd: null,
            topAds: [],
            topEngagers: [],
            specialEvent: {
                title: '',
                description: '',
                endDate: '',
            },
            setCurrentAd: (ad) => set({ currentAd: ad }),
            setTopAds: (ads) => set({ topAds: ads }),
            setTopEngagers: (engagers) => set({ topEngagers: engagers }),
            setSpecialEvent: (event) => set({ specialEvent: event }),
        }),
        {
            name: 'dashboard-storage',
        }
    )
);