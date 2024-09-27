import { parseAbi } from 'viem';

export const admanangerABI = parseAbi([
    'function getCurrentAd() view returns (string, string, uint256, address, address, bool, uint256)',
    'function createAdvertisement(string _link, string _imageUrl, address _referrer) payable',
    'function getNextAdPrice() view returns (uint256)'
]);