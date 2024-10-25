import { parseAbi } from "viem";

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

export const globalABI = [
	[
		{
			inputs: [
				{
					internalType: "address[]",
					name: "_initialGovernors",
					type: "address[]",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{ inputs: [], name: "AccessControlBadConfirmation", type: "error" },
		{
			inputs: [
				{ internalType: "address", name: "account", type: "address" },
				{ internalType: "bytes32", name: "neededRole", type: "bytes32" },
			],
			name: "AccessControlUnauthorizedAccount",
			type: "error",
		},
		{ inputs: [], name: "EnforcedPause", type: "error" },
		{ inputs: [], name: "ExpectedPause", type: "error" },
		{ inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "adIndex",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "advertiser",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "price",
					type: "uint256",
				},
			],
			name: "AdCreated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "adIndex",
					type: "uint256",
				},
			],
			name: "AdDeactivated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "newChief",
					type: "address",
				},
			],
			name: "ChiefUpdated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "adIndex",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
			],
			name: "EngagementRecorded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "Paused",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "referrer",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "referred",
					type: "address",
				},
			],
			name: "ReferralRecorded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "string",
					name: "rewardType",
					type: "string",
				},
			],
			name: "RewardDistributed",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "bytes32",
					name: "previousAdminRole",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "bytes32",
					name: "newAdminRole",
					type: "bytes32",
				},
			],
			name: "RoleAdminChanged",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "sender",
					type: "address",
				},
			],
			name: "RoleGranted",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "bytes32",
					name: "role",
					type: "bytes32",
				},
				{
					indexed: true,
					internalType: "address",
					name: "account",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "sender",
					type: "address",
				},
			],
			name: "RoleRevoked",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: false,
					internalType: "address",
					name: "account",
					type: "address",
				},
			],
			name: "Unpaused",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "admin",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "timestamp",
					type: "uint256",
				},
			],
			name: "WithdrawExecuted",
			type: "event",
		},
		{
			inputs: [],
			name: "DEFAULT_ADMIN_ROLE",
			outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "adToken",
			outputs: [
				{ internalType: "contract AdToken", name: "", type: "address" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "chefOfAdvertising",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_link", type: "string" },
				{ internalType: "string", name: "_imageUrl", type: "string" },
				{ internalType: "address", name: "_referrer", type: "address" },
			],
			name: "createAdvertisement",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [],
			name: "currentEvent",
			outputs: [
				{ internalType: "string", name: "name", type: "string" },
				{ internalType: "uint256", name: "startTime", type: "uint256" },
				{ internalType: "uint256", name: "endTime", type: "uint256" },
				{ internalType: "uint256", name: "multiplier", type: "uint256" },
				{ internalType: "bool", name: "isActive", type: "bool" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
			name: "getAdvertisement",
			outputs: [
				{ internalType: "string", name: "link", type: "string" },
				{ internalType: "string", name: "imageUrl", type: "string" },
				{ internalType: "uint256", name: "price", type: "uint256" },
				{ internalType: "address", name: "advertiser", type: "address" },
				{ internalType: "address", name: "referrer", type: "address" },
				{ internalType: "bool", name: "isActive", type: "bool" },
				{ internalType: "uint256", name: "engagements", type: "uint256" },
				{ internalType: "uint256", name: "createdAt", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "_user", type: "address" }],
			name: "getChiefTimes",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getLatestAd",
			outputs: [
				{ internalType: "string", name: "link", type: "string" },
				{ internalType: "string", name: "imageUrl", type: "string" },
				{ internalType: "uint256", name: "price", type: "uint256" },
				{ internalType: "address", name: "advertiser", type: "address" },
				{ internalType: "address", name: "referrer", type: "address" },
				{ internalType: "bool", name: "isActive", type: "bool" },
				{ internalType: "uint256", name: "engagements", type: "uint256" },
				{ internalType: "uint256", name: "createdAt", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "_user", type: "address" }],
			name: "getReputation",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
			name: "getRoleAdmin",
			outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getTotalAds",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "_user", type: "address" }],
			name: "getUserDetails",
			outputs: [
				{ internalType: "uint256", name: "reputation", type: "uint256" },
				{ internalType: "uint256", name: "timesChief", type: "uint256" },
				{ internalType: "address", name: "referredBy", type: "address" },
				{ internalType: "bool", name: "isAdvertiser", type: "bool" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "_user", type: "address" }],
			name: "getUserStats",
			outputs: [
				{ internalType: "uint256", name: "totalEngagements", type: "uint256" },
				{ internalType: "uint256", name: "engagedAdsCount", type: "uint256" },
				{ internalType: "uint256", name: "level", type: "uint256" },
				{ internalType: "bool", name: "isActive", type: "bool" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "governance",
			outputs: [
				{ internalType: "contract AdGovernance", name: "", type: "address" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes32", name: "role", type: "bytes32" },
				{ internalType: "address", name: "account", type: "address" },
			],
			name: "grantRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes32", name: "role", type: "bytes32" },
				{ internalType: "address", name: "account", type: "address" },
			],
			name: "hasRole",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "lastWeeklyResetTime",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "pause",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "paused",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_adIndex", type: "uint256" }],
			name: "recordEngagement",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes32", name: "role", type: "bytes32" },
				{
					internalType: "address",
					name: "callerConfirmation",
					type: "address",
				},
			],
			name: "renounceRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "bytes32", name: "role", type: "bytes32" },
				{ internalType: "address", name: "account", type: "address" },
			],
			name: "revokeRole",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_name", type: "string" },
				{ internalType: "uint256", name: "_duration", type: "uint256" },
				{ internalType: "uint256", name: "_multiplier", type: "uint256" },
			],
			name: "startEvent",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
			name: "supportsInterface",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "unpause",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "withdraw",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
] as const;
