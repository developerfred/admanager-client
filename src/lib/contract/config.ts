/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseAbi, type Address } from "viem";

export const contractAddress =
	"0x9D205B3A1B2724d545Ca7e3717ea629b9844401a" as const;

export const admanangerABI = parseAbi([
	"function getLatestAd() view returns (string link, string imageUrl, uint256 price, address advertiser, address referrer, bool isActive, uint256 engagements, uint256 createdAt)",
	"function getAdvertisement(uint256 _index) view returns (string link, string imageUrl, uint256 price, address advertiser, address referrer, bool isActive, uint256 engagements, uint256 createdAt)",
	"function getTotalAds() view returns (uint256)",
	"function getUserStats(address _user) view returns (uint256 totalEngagements, uint256 engagedAdsCount, uint256 level, bool isActive)",
	"function getReputation(address _user) view returns (uint256)",
	"function getUserDetails(address _user) view returns (uint256 reputation, uint256 timesChief, address referredBy, bool isAdvertiser)",
	"function getChiefTimes(address _user) view returns (uint256)",
	"function paused() view returns (bool)",

	// State Changing Functions
	"function createAdvertisement(string _link, string _imageUrl, address _referrer) payable",
	"function recordEngagement(uint256 _adIndex)",
	"function startEvent(string _name, uint256 _duration, uint256 _multiplier)",
	"function withdraw()",

	// Events
	"event AdCreated(uint256 indexed adIndex, address indexed advertiser, uint256 indexed price)",
	"event AdDeactivated(uint256 indexed adIndex)",
	"event EngagementRecorded(uint256 indexed adIndex, address indexed user)",
	"event RewardDistributed(address indexed user, uint256 indexed amount, string indexed rewardType)",
	"event ReferralRecorded(address indexed referrer, address indexed referred)",
]);

export const admanangerConfig = {
	address: contractAddress as Address,
	abi: [
		{
			type: "function",
			name: "getLatestAd",
			inputs: [],
			outputs: [
				{ name: "link", type: "string" },
				{ name: "imageUrl", type: "string" },
				{ name: "price", type: "uint256" },
				{ name: "advertiser", type: "address" },
				{ name: "referrer", type: "address" },
				{ name: "isActive", type: "bool" },
				{ name: "engagements", type: "uint256" },
				{ name: "createdAt", type: "uint256" },
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "getAdvertisement",
			inputs: [{ name: "_index", type: "uint256" }],
			outputs: [
				{ name: "link", type: "string" },
				{ name: "imageUrl", type: "string" },
				{ name: "price", type: "uint256" },
				{ name: "advertiser", type: "address" },
				{ name: "referrer", type: "address" },
				{ name: "isActive", type: "bool" },
				{ name: "engagements", type: "uint256" },
				{ name: "createdAt", type: "uint256" },
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "getTotalAds",
			inputs: [],
			outputs: [{ name: "", type: "uint256" }],
			stateMutability: "view",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_adIndex",
					type: "uint256",
				},
			],
			name: "recordEngagement",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},

		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
			],
			name: "getUserStats",
			outputs: [
				{
					internalType: "uint256",
					name: "totalEngagements",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "engagedAdsCount",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "level",
					type: "uint256",
				},
				{
					internalType: "bool",
					name: "isActive",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
			],
			name: "getUserDetails",
			outputs: [
				{
					internalType: "uint256",
					name: "reputation",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "timesChief",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "referredBy",
					type: "address",
				},
				{
					internalType: "bool",
					name: "isAdvertiser",
					type: "bool",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
			],
			name: "getChiefTimes",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
	] as const,
} as const;

export interface CurrentAd {
	link: string;
	imageUrl: string;
	price: bigint;
	advertiser: Address;
	referrer: Address;
	isActive: boolean;
	engagements: bigint;
	createdAt: bigint;
}

export interface Advertisement {
	link: string;
	imageUrl: string;
	price: bigint;
	advertiser: Address;
	referrer: Address;
	isActive: boolean;
	engagements: bigint;
	createdAt: bigint;
	index?: number;
}

export interface UserStats {
	totalEngagements: bigint;
	engagedAdsCount: bigint;
	level: bigint;
	isActive: boolean;
}

export interface UserDetails {
	reputation: bigint;
	timesChief: bigint;
	referredBy: Address;
	isAdvertiser: boolean;
}

export interface SpecialEvent {
	name: string;
	duration: bigint;
	multiplier: bigint;
}

export const FRESH_DATA_INTERVAL = 30_000;
export const BASE_PRICE = "0.0003";
export const PRICE_INCREASE_PERCENTAGE = 0.05;

declare global {
	interface Window {
		ethereum?: {
			isMetaMask?: boolean;
			// @ts-ignore
			request?: (...args: any[]) => Promise<any>;
		};
	}
}
