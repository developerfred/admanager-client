import type { Address } from 'viem';

// Contract addresses per chain
export const CONTRACT_ADDRESSES: Record<number, Address> = {
  42220: '0xdc461a5b7dd3527612867b08a2ccc87416b44879', // Celo
  44787: '0xdc461a5b7dd3527612867b08a2ccc87416b44879', // Celo Alfajores
  8453: '0xA1558418153fbfb5799be94f6b238eEC583c8F84', // Base
  84532: '0xA1558418153fbfb5799be94f6b238eEC583c8F84', // Base Sepolia
  534352: '0x9D205B3A1B2724d545Ca7e3717ea629b9844401a', // Scroll
  534351: '0xA1558418153fbfb5799be94f6b238eEC583c8F84', // Scroll Sepolia
} as const;

export const getContractAddress = (chainId?: number): Address | undefined => {
  if (!chainId) return undefined;
  return CONTRACT_ADDRESSES[chainId];
};

// Types
export interface CurrentAd {
  link: string;
  imageUrl: string;
  price: bigint;
  advertiser: Address;
  referrer: Address;
  isActive: boolean;
  engagements: bigint;
}

export interface Advertisement extends CurrentAd {
  createdAt: bigint;
}