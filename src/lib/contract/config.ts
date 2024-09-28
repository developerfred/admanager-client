/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseAbi, Address } from 'viem';

export const contractAddress = '0x020243968704ccF8202Afd1F1134a90953385877';


export const admanangerABI = parseAbi([
    'function getCurrentAd() view returns (string, string, uint256, address, address, bool, uint256)',
    'function createAdvertisement(string _link, string _imageUrl, address _referrer) payable',
    'function getNextAdPrice() view returns (uint256)'
]);

export interface CurrentAd {
    link: string;
    imageUrl: string;
    price: bigint;
    advertiser: Address;
    referrer: Address;
    isActive: boolean;
    engagements: bigint;
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
}


declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            // @ts-ignore
            request?: (...args: any[]) => Promise<any>;
        };
    }
}