/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { useState, useEffect } from 'react';
import { 
  SupportedNetworks, 
  NETWORK_CONFIGS, 
  getContractAddress, 
  getNetworkRpcUrl,
  isNetworkSupported 
} from '@/lib/contract/config';

export const useAppKitNetwork = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [isSupportedNetwork, setIsSupportedNetwork] = useState<boolean>(true);

  useEffect(() => {
    const updateNetwork = async () => {
      if (!walletProvider || !isConnected) return;

      try {
        // Obter chainId atual do provider
        const chainIdHex = await walletProvider.request({ 
          method: 'eth_chainId' 
        });
        const chainId = parseInt(chainIdHex, 16);
        
        setCurrentChainId(chainId);
        setIsSupportedNetwork(isNetworkSupported(chainId));

        // Criar public client para a rede atual
        const rpcUrl = getNetworkRpcUrl(chainId);
        const publicClient = createPublicClient({
          transport: http(rpcUrl),
        });

        setPublicClient(publicClient);

      } catch (error) {
        console.error('Error updating network:', error);
      }
    };

    updateNetwork();

    // Listeners para mudanças de rede
    if (walletProvider) {
      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setCurrentChainId(newChainId);
        setIsSupportedNetwork(isNetworkSupported(newChainId));
      };

      const handleAccountsChanged = () => {
        updateNetwork();
      };

      walletProvider.on('chainChanged', handleChainChanged);
      walletProvider.on('accountsChanged', handleAccountsChanged);

      return () => {
        walletProvider.removeListener('chainChanged', handleChainChanged);
        walletProvider.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [walletProvider, isConnected]);

  const switchNetwork = async (chainId: number) => {
    if (!walletProvider) return false;

    try {
      await walletProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError: any) {
      // Esta cadeia não foi adicionada ao MetaMask
      if (switchError.code === 4902) {
        try {
          const networkConfig = NETWORK_CONFIGS[
            Object.values(SupportedNetworks).find(
              key => NETWORK_CONFIGS[key].chainId === chainId
            ) as SupportedNetworks
          ];

          await walletProvider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainId.toString(16)}`,
              chainName: networkConfig.name,
              rpcUrls: [networkConfig.rpcUrl],
              blockExplorerUrls: [networkConfig.explorerUrl],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
            }],
          });
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          return false;
        }
      }
      console.error('Error switching network:', switchError);
      return false;
    }
  };

  const getCurrentContractAddress = (): `0x${string}` | null => {
    if (!currentChainId) return null;
    return getContractAddress(currentChainId) as `0x${string}`;
  };

  return {
    address,
    isConnected,
    currentChainId,
    publicClient,
    isSupportedNetwork,
    switchNetwork,
    getCurrentContractAddress,
    walletProvider
  };
};