/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useReadContract, useReadContracts } from "wagmi";
import { admanangerConfig } from "@/lib/contract/config";
import type { Advertisement } from "@/lib/contract/config";
import { useEffect } from "react";

const isDev = process.env.NODE_ENV === "development";

function logDebug(...args: any[]) {
	if (isDev) {
		console.debug(...args);
	}
}

export function useAdManager() {	
	const {
		data: totalAdsData,
		isLoading: isTotalLoading,
		error: totalError,
	} = useReadContract({
		...admanangerConfig,
		functionName: "getTotalAds",
		onSuccess: (data) => logDebug("📊 Total ads loaded:", data?.toString()),
		onError: (err) => console.error("❌ Error loading total ads:", err),
	});

	
	const {
		data: latestAdData,
		isLoading: isLatestLoading,
		error: latestError,        
	} = useReadContract({
		...admanangerConfig,
		functionName: "getLatestAd",
		onSuccess: (data) => logDebug("🆕 Latest ad loaded:", data),
		onError: (err) => console.error("❌ Error loading latest ad:", err),
        
	});

	
	const {
		data: allAdsData,
		isLoading: isAdsLoading,
		error: adsError,
	} = useReadContracts({
		contracts: Array.from({ length: Number(totalAdsData || 0) }, (_, i) => ({
			...admanangerConfig,
			functionName: "getAdvertisement",
			args: [BigInt(i)],
		})),
		onSuccess: (data) => logDebug("📝 All ads loaded:", data),
		onError: (err) => console.error("❌ Error loading all ads:", err),
	});

	useEffect(() => {
		if (isDev) {
			console.group("🔄 Ad Manager Data Processing");
			console.log("Total Ads:", totalAdsData?.toString());
			console.log("Latest Ad:", latestAdData);
			console.log("All Ads:", allAdsData);
			console.groupEnd();
		}
	}, [totalAdsData, latestAdData, allAdsData]);

	
	const currentAd = latestAdData
		? ({
				link: latestAdData[0],
				imageUrl: latestAdData[1],
				price: latestAdData[2],
				advertiser: latestAdData[3],
				referrer: latestAdData[4],
				isActive: latestAdData[5],
				engagements: latestAdData[6],
				createdAt: latestAdData[7],
			} as Advertisement)
		: null;

	const allAds =
		allAdsData?.map(
			(data, index) =>
				({
					link: data.result[0],
					imageUrl: data.result[1],
					price: data.result[2],
					advertiser: data.result[3],
					referrer: data.result[4],
					isActive: data.result[5],
					engagements: data.result[6],
					createdAt: data.result[7],
					index,
				}) as Advertisement,
		) || [];

	const topAds = [...allAds]
		.sort((a, b) => Number(b.engagements - a.engagements))
		.slice(0, 3);

	const isLoading = isTotalLoading || isLatestLoading || isAdsLoading;
	const error = totalError || latestError || adsError;

	const result = {
		currentAd,
		allAds,
		topAds,
		isLoading,
		error,
		totalAds: totalAdsData,
	};

	if (isDev) {
		console.log("📊 useAdManager final state:", result);
	}

	return result;
}
