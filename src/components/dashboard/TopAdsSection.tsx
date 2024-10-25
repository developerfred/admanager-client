import { Advertisement } from "@/lib/contract/config";
import { Trophy } from "lucide-react";

interface TopAdsSectionProps {
	ads: Advertisement[];
	renderAdCard: (ad: Advertisement) => React.ReactNode;
}

export const TopAdsSection: React.FC<TopAdsSectionProps> = ({
	ads,
	renderAdCard,
}) => (
	<div>
		<h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
			<Trophy className="mr-2" /> Top Performing Ads
		</h2>
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{ads.map((ad) => renderAdCard(ad))}
		</div>
	</div>
);
