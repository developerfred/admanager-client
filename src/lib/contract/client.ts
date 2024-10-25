import { createPublicClient, http } from 'viem';
import { scroll } from 'viem/chains';

export const publicClient = createPublicClient({
    chain: scroll,
    transport: http(),
});