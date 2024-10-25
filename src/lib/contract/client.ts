/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	createPublicClient,
	createWalletClient,
	http,
	custom,
	type PublicClient,
	type WalletClient,
} from "viem";
import { scroll } from "viem/chains";
import { admanangerABI, type Advertisement, contractAddress } from "./config";

export const publicClient = createPublicClient({
	chain: scroll,
	transport: http(),
});

export const createViemWalletClient = (provider: any): WalletClient => {
	return createWalletClient({
		chain: scroll,
		transport: custom(provider),
	});
};

export const getContractReads = {
	async getLatestAd(client: PublicClient = publicClient) {
		return client.readContract({
			abi: admanangerABI,
			address: contractAddress,
			functionName: "getLatestAd",
		}) as unknown as Promise<Advertisement>;
	},

	async getAdvertisement(index: number, client: PublicClient = publicClient) {
		return client.readContract({
			abi: admanangerABI,
			address: contractAddress,
			functionName: "getAdvertisement",
			args: [BigInt(index)],
		}) as unknown as Promise<Advertisement>;
	},

	async getTotalAds(client: PublicClient = publicClient) {
		return client.readContract({
			abi: admanangerABI,
			address: contractAddress,
			functionName: "getTotalAds",
		}) as Promise<bigint>;
	},
};

export const getContractWrites = {
	async createAdvertisement(
		client: WalletClient,
		{
			link,
			imageUrl,
			referrer,
		}: Omit<
			Advertisement,
			"price" | "advertiser" | "isActive" | "engagements" | "createdAt"
		>,
		value: bigint,
	) {
		const [address] = await client.requestAddresses();

		const { request } = await publicClient.simulateContract({
			account: address,
			address: contractAddress,
			abi: admanangerABI,
			functionName: "createAdvertisement",
			args: [link, imageUrl, referrer],
			value,
		});

		return client.writeContract(request);
	},

	async recordEngagement(client: WalletClient, adIndex: number) {
		const [address] = await client.requestAddresses();

		const { request } = await publicClient.simulateContract({
			account: address,
			address: contractAddress,
			abi: admanangerABI,
			functionName: "recordEngagement",
			args: [BigInt(adIndex)],
		});

		return client.writeContract(request);
	},
};
