import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CommunityChallenge {
	description: string;
	goal: number;
	currentProgress: number;
	reward: number;
	deadline: string;
}

const communityChallenge: CommunityChallenge = {
	description: "Reach 100,000 total engagements across all ads",
	goal: 100000,
	currentProgress: 75000,
	reward: 1000,
	deadline: "7 days left",
};

const CommunityChallenge: React.FC = () => (
	<div>
		<h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
			Community Challenge
		</h2>
		<Card className="bg-black/50 backdrop-blur-md border-0">
			<CardHeader>
				<h3 className="text-xl font-bold text-[#9AEDEF]">
					{communityChallenge.description}
				</h3>
			</CardHeader>
			<CardContent>
				<Progress
					value={
						(communityChallenge.currentProgress / communityChallenge.goal) * 100
					}
					className="w-full mb-4"
				/>
				<p className="text-sm mb-2 text-white/80">
					Progress: {communityChallenge.currentProgress} /{" "}
					{communityChallenge.goal}
				</p>
				<p className="text-sm mb-2 text-white/80">
					Reward: {communityChallenge.reward} A+ Tokens
				</p>
				<p className="text-sm text-white/80">{communityChallenge.deadline}</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
					Contribute Now
				</Button>
			</CardFooter>
		</Card>
	</div>
);

export default CommunityChallenge;
