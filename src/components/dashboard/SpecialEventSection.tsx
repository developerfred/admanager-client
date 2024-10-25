import { Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface SpecialEventSectionProps {
	specialEvent: {
		title: string;
		description: string;
		endDate: string;
	} | null;
}

export const SpecialEventSection: React.FC<SpecialEventSectionProps> = ({
	specialEvent,
}) => (
	<Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
		<CardHeader>
			<h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] flex items-center">
				<Clock className="mr-2" /> Special Event
			</h2>
		</CardHeader>
		<CardContent>
			{specialEvent ? (
				<>
					<p className="text-[#D365E3] mb-2 font-semibold">
						{specialEvent.title}
					</p>
					<p className="text-sm text-white/80 mb-2">
						{specialEvent.description}
					</p>
					<p className="text-xs text-[#9AEDEF]">
						Ends on: {new Date(specialEvent.endDate).toLocaleDateString()}
					</p>
				</>
			) : (
				<p className="text-white/60">No active special events</p>
			)}
		</CardContent>
		{specialEvent && (
			<CardFooter>
				<Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
					Participate Now
				</Button>
			</CardFooter>
		)}
	</Card>
);
