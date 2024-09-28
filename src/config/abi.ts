import { parseAbi, } from 'viem';

export const admanangerABI = parseAbi([
    'function getCurrentAd() view returns (string, string, uint256, address, address, bool, uint256)',
    'function createAdvertisement(string _link, string _imageUrl, address _referrer) payable',
    'function getNextAdPrice() view returns (uint256)',    
]);


export const globalABI = [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
    {
        "type": "function",
        "name": "ADMIN_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CHIEF_REFERRAL_THRESHOLD",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CHIEF_TOKEN_THRESHOLD",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ENGAGEMENT_REWARD",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "INITIAL_PRICE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "UD60x18" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "LEVEL_UP_THRESHOLD",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "OPERATOR_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "PRICE_MULTIPLIER",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "UD60x18" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "REFERRAL_DISCOUNT",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "REFERRAL_REWARD",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "WEEKLY_BONUS",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "achievements",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "description", "type": "string", "internalType": "string" },
            { "name": "threshold", "type": "uint256", "internalType": "uint256" },
            { "name": "reward", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "adToken",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address", "internalType": "contract AdToken" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "addAchievement",
        "inputs": [
            { "name": "_name", "type": "string", "internalType": "string" },
            { "name": "_description", "type": "string", "internalType": "string" },
            { "name": "_threshold", "type": "uint256", "internalType": "uint256" },
            { "name": "_reward", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "advertisements",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [
            { "name": "link", "type": "string", "internalType": "string" },
            { "name": "imageUrl", "type": "string", "internalType": "string" },
            { "name": "price", "type": "uint256", "internalType": "uint256" },
            { "name": "advertiser", "type": "address", "internalType": "address" },
            { "name": "referrer", "type": "address", "internalType": "address" },
            { "name": "isActive", "type": "bool", "internalType": "bool" },
            { "name": "engagements", "type": "uint256", "internalType": "uint256" },
            { "name": "createdAt", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "advertisers",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [
            { "name": "hasAdvertised", "type": "bool", "internalType": "bool" },
            { "name": "lastAdIndex", "type": "uint256", "internalType": "uint256" },
            {
                "name": "totalEngagements",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "lastEngagementTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "level", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "awardWeeklyBonus",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "chefOfAdvertising",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "claimChiefOfAdvertising",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createAdvertisement",
        "inputs": [
            { "name": "_link", "type": "string", "internalType": "string" },
            { "name": "_imageUrl", "type": "string", "internalType": "string" },
            { "name": "_referrer", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "currentChallenge",
        "inputs": [],
        "outputs": [
            { "name": "description", "type": "string", "internalType": "string" },
            { "name": "goal", "type": "uint256", "internalType": "uint256" },
            {
                "name": "currentProgress",
                "type": "uint256",
                "internalType": "uint256"
            },
            { "name": "reward", "type": "uint256", "internalType": "uint256" },
            { "name": "deadline", "type": "uint256", "internalType": "uint256" },
            { "name": "completed", "type": "bool", "internalType": "bool" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "currentEvent",
        "inputs": [],
        "outputs": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "startTime", "type": "uint256", "internalType": "uint256" },
            { "name": "endTime", "type": "uint256", "internalType": "uint256" },
            {
                "name": "rewardMultiplier",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "deactivateAdvertisement",
        "inputs": [
            { "name": "_adIndex", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getActiveAds",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct AdvertisementManager.Advertisement[]",
                "components": [
                    { "name": "link", "type": "string", "internalType": "string" },
                    { "name": "imageUrl", "type": "string", "internalType": "string" },
                    { "name": "price", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "advertiser",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "referrer", "type": "address", "internalType": "address" },
                    { "name": "isActive", "type": "bool", "internalType": "bool" },
                    {
                        "name": "engagements",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "createdAt", "type": "uint256", "internalType": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAdTokenBalance",
        "inputs": [
            { "name": "_address", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAdvertiserInfo",
        "inputs": [
            { "name": "_advertiser", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "bool", "internalType": "bool" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAdvertiserLevel",
        "inputs": [
            { "name": "_advertiser", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAdvertiserTotalEngagements",
        "inputs": [
            { "name": "_advertiser", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentAd",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "bool", "internalType": "bool" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentChallengeInfo",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "bool", "internalType": "bool" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentChief",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentEventInfo",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getEventRewardMultiplier",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMultipleAds",
        "inputs": [
            { "name": "_indices", "type": "uint256[]", "internalType": "uint256[]" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct AdvertisementManager.Advertisement[]",
                "components": [
                    { "name": "link", "type": "string", "internalType": "string" },
                    { "name": "imageUrl", "type": "string", "internalType": "string" },
                    { "name": "price", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "advertiser",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "referrer", "type": "address", "internalType": "address" },
                    { "name": "isActive", "type": "bool", "internalType": "bool" },
                    {
                        "name": "engagements",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "createdAt", "type": "uint256", "internalType": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getNextAdPrice",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getReputationDiscount",
        "inputs": [
            { "name": "user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTimesAsChief",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalAchievements",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalAds",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserAchievementProgress",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool[]", "internalType": "bool[]" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserChallengeParticipation",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserCreatedAds",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct AdvertisementManager.Advertisement[]",
                "components": [
                    { "name": "link", "type": "string", "internalType": "string" },
                    { "name": "imageUrl", "type": "string", "internalType": "string" },
                    { "name": "price", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "advertiser",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "referrer", "type": "address", "internalType": "address" },
                    { "name": "isActive", "type": "bool", "internalType": "bool" },
                    {
                        "name": "engagements",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "createdAt", "type": "uint256", "internalType": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserEngagedAds",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct AdvertisementManager.Advertisement[]",
                "components": [
                    { "name": "link", "type": "string", "internalType": "string" },
                    { "name": "imageUrl", "type": "string", "internalType": "string" },
                    { "name": "price", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "advertiser",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "referrer", "type": "address", "internalType": "address" },
                    { "name": "isActive", "type": "bool", "internalType": "bool" },
                    {
                        "name": "engagements",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "createdAt", "type": "uint256", "internalType": "uint256" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserEngagements",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserEventParticipation",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserReferralInfo",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserStats",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "adsCreated", "type": "uint256", "internalType": "uint256" },
            { "name": "adsEngaged", "type": "uint256", "internalType": "uint256" },
            { "name": "timesChief", "type": "uint256", "internalType": "uint256" },
            {
                "name": "referralsCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "achievementsUnlocked",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "challengeParticipation",
                "type": "bool",
                "internalType": "bool"
            },
            { "name": "eventParticipation", "type": "bool", "internalType": "bool" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasAdvertised",
        "inputs": [
            { "name": "_address", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasUnlockedAchievement",
        "inputs": [
            { "name": "_user", "type": "address", "internalType": "address" },
            { "name": "_achievementId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isSpecialEventActive",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "lastWeeklyResetTime",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pauseContract",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "recordEngagement",
        "inputs": [
            { "name": "_adIndex", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "recoverERC20",
        "inputs": [
            { "name": "_tokenAddress", "type": "address", "internalType": "address" },
            { "name": "_amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "refer",
        "inputs": [
            { "name": "_referrer", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "referrals",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "referrers",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            {
                "name": "callerConfirmation",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "startNewCommunityChallenge",
        "inputs": [
            { "name": "_description", "type": "string", "internalType": "string" },
            { "name": "_goal", "type": "uint256", "internalType": "uint256" },
            { "name": "_reward", "type": "uint256", "internalType": "uint256" },
            { "name": "_duration", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "startSpecialEvent",
        "inputs": [
            { "name": "_name", "type": "string", "internalType": "string" },
            { "name": "_duration", "type": "uint256", "internalType": "uint256" },
            {
                "name": "_rewardMultiplier",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "unpauseContract",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "userAchievements",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "userEngagements",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "userReputation",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "weeklyEngagements",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdraw",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawTokens",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "AchievementUnlocked",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "achievementId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "AdvertisementDeactivated",
        "inputs": [
            {
                "name": "adIndex",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EngagementRecorded",
        "inputs": [
            {
                "name": "adIndex",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EngagementRewardMinted",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LevelUp",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "newLevel",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewAdvertisement",
        "inputs": [
            {
                "name": "link",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "imageUrl",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "price",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "advertiser",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "referrer",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewChiefOfAdvertising",
        "inputs": [
            {
                "name": "newChief",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenBalance",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "referralLevel",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewCommunityChallenge",
        "inputs": [
            {
                "name": "description",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "goal",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "reward",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewReferral",
        "inputs": [
            {
                "name": "referred",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "referrer",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ReferralRewardDistributed",
        "inputs": [
            {
                "name": "referrer",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "reward",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "level",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ReputationUpdated",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "newReputation",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "previousAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "newAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "SpecialEventStarted",
        "inputs": [
            {
                "name": "name",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "rewardMultiplier",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "WeeklyBonusMinted",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "WithdrawCompleted",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    { "type": "error", "name": "AccessControlBadConfirmation", "inputs": [] },
    {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "neededRole", "type": "bytes32", "internalType": "bytes32" }
        ]
    },
    { "type": "error", "name": "EnforcedPause", "inputs": [] },
    { "type": "error", "name": "ExpectedPause", "inputs": [] },
    {
        "type": "error",
        "name": "PRBMath_MulDiv18_Overflow",
        "inputs": [
            { "name": "x", "type": "uint256", "internalType": "uint256" },
            { "name": "y", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "PRBMath_MulDiv_Overflow",
        "inputs": [
            { "name": "x", "type": "uint256", "internalType": "uint256" },
            { "name": "y", "type": "uint256", "internalType": "uint256" },
            { "name": "denominator", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "PRBMath_UD60x18_Exp2_InputTooBig",
        "inputs": [{ "name": "x", "type": "uint256", "internalType": "UD60x18" }]
    },
    {
        "type": "error",
        "name": "PRBMath_UD60x18_Log_InputTooSmall",
        "inputs": [{ "name": "x", "type": "uint256", "internalType": "UD60x18" }]
    },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] }
] as const