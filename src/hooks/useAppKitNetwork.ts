import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { getContractAddress } from '@/config/contract';

export const useAppKitNetwork = () => {
  const { address, isConnected, chainId } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();

  const contractAddress = getContractAddress(chainId);

  return {
    address,
    isConnected,
    chainId,
    publicClient,
    walletClient,
    contractAddress,
    switchChain,
  };
};