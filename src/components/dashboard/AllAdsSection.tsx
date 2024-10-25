/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Advertisement } from "@/lib/contract/config";
import { Sparkles } from "lucide-react";

// Constants
const STYLES = {
	HEADING: {
		BASE: "text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center",
		ICON: "mr-2",
	},
	GRID: "grid grid-cols-1 sm:grid-cols-2 gap-4",
} as const;

const HEADING_TEXT = "All Advertisements";

// Types
interface AllAdsSectionProps {
	ads: Advertisement[];
	renderAdCard: (ad: Advertisement) => React.ReactNode;
}

// Components
export const AllAdsSection: React.FC<AllAdsSectionProps> = ({
	ads,
	renderAdCard,
}) => {
	const renderHeader = () => (
		<h2 className={STYLES.HEADING.BASE}>
			<Sparkles className={STYLES.HEADING.ICON} />
			{HEADING_TEXT}
		</h2>
	);

	const renderAdsGrid = () => (
		<div className={STYLES.GRID}>
			{ads.map((ad) => (
				<div key={ad.id}>{renderAdCard(ad)}</div>
			))}
		</div>
	);

	return (
		<div>
			{renderHeader()}
			{renderAdsGrid()}
		</div>
	);
};
