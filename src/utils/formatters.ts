export const formatAddress = (address: string | undefined): string => {
	if (!address) return "0x...";
	if (typeof address !== "string") return "0x...";
	if (address.length <= 13) return address;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
