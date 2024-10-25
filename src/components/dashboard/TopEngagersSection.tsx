/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TopEngager } from "@/types";
import { Address } from "viem";

interface TopEngagersSectionProps {
	engagers: TopEngager[];
	formatAddress: (address: Address) => string;
}

export const TopEngagersSection: React.FC<TopEngagersSectionProps> = ({
	engagers,
	formatAddress,
}) => (
	<Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#9AEDEF]/20">
		<CardHeader>
			<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
				<Sparkles className="mr-2" /> Top Engaging Wallets
			</h2>
		</CardHeader>
		<CardContent>
			{engagers.map((engager, index) => (
				<div
					key={engager.id}
					className={`flex justify-between items-center ${
						index !== 0 ? "border-t border-[#333]" : ""
					} py-2`}
				>
					<span className="text-[#D365E3]">
						{
							// @ts-expect-error
							formatAddress(engager.address)
						}
					</span>
					<span className="font-bold text-[#9AEDEF]">
						{engager.engagements.toLocaleString()} engagements
					</span>
				</div>
			))}
		</CardContent>
	</Card>
);
