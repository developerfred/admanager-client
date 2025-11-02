// lib/contract/config.ts
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseAbi, Address } from 'viem';

export enum SupportedNetworks {
    CELO = 'celo',
    CELO_ALFAJORES = 'celo-alfajores',
    BASE = 'base',
    BASE_SEPOLIA = 'base-sepolia',
    SCROLL = 'scroll',
    SCROLL_SEPOLIA = 'scroll-sepolia'
}

export interface NetworkConfig {
    chainId: number;
    name: string;
    explorerUrl: string;
    rpcUrl?: string;
}

export const NETWORK_CONFIGS: Record<SupportedNetworks, NetworkConfig> = {
    [SupportedNetworks.CELO]: {
        chainId: 42220,
        name: 'Celo Mainnet',
        explorerUrl: 'https://celoscan.io',
        rpcUrl: process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://forno.celo.org'
    },
    [SupportedNetworks.CELO_ALFAJORES]: {
        chainId: 44787,
        name: 'Celo Alfajores Testnet',
        explorerUrl: 'https://alfajores.celoscan.io',
        rpcUrl: process.env.NEXT_PUBLIC_CELO_ALFAJORES_RPC_URL || 'https://alfajores-forno.celo-testnet.org'
    },
    [SupportedNetworks.BASE]: {
        chainId: 8453,
        name: 'Base Mainnet',
        explorerUrl: 'https://basescan.org',
        rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'
    },
    [SupportedNetworks.BASE_SEPOLIA]: {
        chainId: 84532,
        name: 'Base Sepolia Testnet',
        explorerUrl: 'https://sepolia.basescan.org',
        rpcUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'
    },
    [SupportedNetworks.SCROLL]: {
        chainId: 534352,
        name: 'Scroll Mainnet',
        explorerUrl: 'https://scrollscan.com',
        rpcUrl: process.env.NEXT_PUBLIC_SCROLL_RPC_URL || 'https://rpc.scroll.io'
    },
    [SupportedNetworks.SCROLL_SEPOLIA]: {
        chainId: 534351,
        name: 'Scroll Sepolia Testnet',
        explorerUrl: 'https://sepolia.scrollscan.com',
        rpcUrl: process.env.NEXT_PUBLIC_SCROLL_SEPOLIA_RPC_URL || 'https://sepolia-rpc.scroll.io'
    }
};

export const ADMANAGER_CONTRACT_ADDRESSES: Record<SupportedNetworks, string> = {
    [SupportedNetworks.CELO]: '0xdc461a5b7dd3527612867b08a2ccc87416b44879',
    [SupportedNetworks.CELO_ALFAJORES]: '0xdc461a5b7dd3527612867b08a2ccc87416b44879',
    [SupportedNetworks.BASE]: '0xA1558418153fbfb5799be94f6b238eEC583c8F84',
    [SupportedNetworks.BASE_SEPOLIA]: '0xA1558418153fbfb5799be94f6b238eEC583c8F84',
    [SupportedNetworks.SCROLL]: '0x9D205B3A1B2724d545Ca7e3717ea629b9844401a',
    [SupportedNetworks.SCROLL_SEPOLIA]: '0xA1558418153fbfb5799be94f6b238eEC583c8F84',
};

export const getContractAddress = (chainId: number): string => {
    const network = Object.values(SupportedNetworks).find(
        networkKey => NETWORK_CONFIGS[networkKey].chainId === Number(chainId)
    );

    if (network && ADMANAGER_CONTRACT_ADDRESSES[network]) {
        return ADMANAGER_CONTRACT_ADDRESSES[network];
    }

    // Fallback para Base
    return ADMANAGER_CONTRACT_ADDRESSES[SupportedNetworks.BASE];
};

export const isNetworkSupported = (chainId: number): boolean => {
    return Object.values(NETWORK_CONFIGS).some(
        config => config.chainId === Number(chainId)
    );
};

export const getNetworkConfig = (chainId: number): NetworkConfig | null => {
    const network = Object.values(SupportedNetworks).find(
        networkKey => NETWORK_CONFIGS[networkKey].chainId === Number(chainId)
    );

    return network ? NETWORK_CONFIGS[network] : null;
};

export const getNetworkRpcUrl = (chainId: number): string => {
    const config = getNetworkConfig(chainId);
    return config?.rpcUrl || 'https://mainnet.base.org';
};



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