/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { scroll } from "viem/chains";
import { createPublicClient, http } from "viem";
import { admanangerABI, contractAddress } from "@/lib/contract/config";
import { SpecialEvent, TopEngager } from "@/types";

const publicClient = createPublicClient({
	chain: scroll,
	transport: http(process.env.REACT_APP_RPC_URL),
});

interface Advertisement {
	link: string;
	imageUrl: string;
	price: bigint;
	advertiser: `0x${string}`;
	referrer: `0x${string}`;
	isActive: boolean;
	engagements: bigint;
	createdAt: bigint;
	index?: number;
}

interface StoreState {
	currentAd: Advertisement | null;
	allAds: Advertisement[];
	topAds: Advertisement[];
	topEngagers: TopEngager[];
	specialEvent: SpecialEvent;
	lastFetch: number;
	isLoading: boolean;
	error: string | null;
}

const serializeBigInts = (obj: any): any => {
	if (obj === null || obj === undefined) {
		return obj;
	}

	if (typeof obj === "bigint") {
		return obj.toString();
	}

	if (Array.isArray(obj)) {
		return obj.map(serializeBigInts);
	}

	if (typeof obj === "object") {
		const serialized: { [key: string]: any } = {};
		for (const [key, value] of Object.entries(obj)) {
			serialized[key] = serializeBigInts(value);
		}
		return serialized;
	}

	return obj;
};

const deserializeBigInts = (obj: any): any => {
	if (obj === null || obj === undefined) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(deserializeBigInts);
	}

	if (typeof obj === "object") {
		const deserialized: { [key: string]: any } = {};
		for (const [key, value] of Object.entries(obj)) {
			const bigIntFields = ["price", "engagements", "createdAt"];
			if (bigIntFields.includes(key) && typeof value === "string") {
				deserialized[key] = BigInt(value);
			} else {
				deserialized[key] = deserializeBigInts(value);
			}
		}
		return deserialized;
	}

	return obj;
};

export const useDashboardStore = create(
	persist<StoreState>(
		(set, get) => ({
			currentAd: null,
			allAds: [],
			topAds: [],
			topEngagers: [],
			specialEvent: {
				title: "",
				description: "",
				endDate: "",
			},
			lastFetch: 0,
			isLoading: false,
			error: null,

			fetchAllAds: async () => {
				const state = get();
				const now = Date.now();

				if (
					state.allAds.length > 0 &&
					now - state.lastFetch < FRESH_DATA_INTERVAL
				) {
					return;
				}

				set({ isLoading: true, error: null });

				try {
					const totalAds = (await publicClient.readContract({
						address: contractAddress,
						abi: admanangerABI,
						functionName: "getTotalAds",
					})) as bigint;

					const ads: Advertisement[] = [];
					for (let i = 0; i < Number(totalAds); i++) {
						const ad = (await publicClient.readContract({
							address: contractAddress,
							abi: admanangerABI,
							functionName: "getAdvertisement",
							args: [BigInt(i)],
						})) as unknown as Advertisement;

						ads.push({
							...ad,
							index: i,
						});
					}

					const latestAd = (await publicClient.readContract({
						address: contractAddress,
						abi: admanangerABI,
						functionName: "getLatestAd",
					})) as unknown as Advertisement;

					const sortedAds = [...ads].sort((a, b) =>
						Number(b.engagements - a.engagements),
					);

					set({
						allAds: ads,
						currentAd: latestAd,
						topAds: sortedAds.slice(0, 3),
						lastFetch: now,
						isLoading: false,
					});
				} catch (error: any) {
					set({
						error: error.message || "Failed to fetch advertisements",
						isLoading: false,
					});
				}
			},

			updateEngagement: (adIndex: number) => {
				set((state) => {
					const newAllAds = state.allAds.map((ad) => {
						if (ad.index === adIndex) {
							return {
								...ad,
								engagements: ad.engagements + BigInt(1),
							};
						}
						return ad;
					});

					const newTopAds = [...newAllAds]
						.sort((a, b) => Number(b.engagements - a.engagements))
						.slice(0, 3);

					const newCurrentAd =
						state.currentAd && state.currentAd.index === adIndex
							? {
									...state.currentAd,
									engagements: state.currentAd.engagements + BigInt(1),
								}
							: state.currentAd;

					return {
						allAds: newAllAds,
						topAds: newTopAds,
						currentAd: newCurrentAd,
					};
				});
			},

			setCurrentAd: (ad) => set({ currentAd: ad }),
			setTopAds: (ads) => set({ topAds: ads }),
			setTopEngagers: (engagers) => set({ topEngagers: engagers }),
			setSpecialEvent: (event) => set({ specialEvent: event }),
			setError: (error) => set({ error }),
			setIsLoading: (isLoading) => set({ isLoading }),
		}),
		{
			name: "dashboard-storage",
			storage: createJSONStorage(() => localStorage, {
				serialize: (state) => {
					const serializedState = serializeBigInts(state);
					return JSON.stringify(serializedState);
				},
				deserialize: (str) => {
					const parsed = JSON.parse(str);
					return deserializeBigInts(parsed);
				},
			}),
			partialize: (state) => ({
				currentAd: state.currentAd,
				allAds: state.allAds,
				topAds: state.topAds,
				topEngagers: state.topEngagers,
				specialEvent: state.specialEvent,
				lastFetch: state.lastFetch,
			}),
		},
	),
);
