import Link from "next/link";
import React from "react";

const Footer: React.FC = () => (
	<footer className="relative bg-black/50 backdrop-blur-md text-white mt-16 py-8 border-t border-[#333]">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
			<div>
				<h3 className="font-bold text-lg sm:text-xl mb-4 text-[#9AEDEF]">
					About us
				</h3>
				<ul className="space-y-2">
					<li className="hover:text-[#D365E3] transition-colors duration-200">
						History
					</li>
					<li className="hover:text-[#D365E3] transition-colors duration-200">
						Github
					</li>
				</ul>
			</div>
			<div>
				<h3 className="font-bold text-lg sm:text-xl mb-4 text-[#9AEDEF]">
					Social Media
				</h3>
				<ul className="space-y-2">
					<li className="hover:text-[#D365E3] transition-colors duration-200">
						Instagram
					</li>
					<li className="hover:text-[#D365E3] transition-colors duration-200">
						<Link href="https://twitter.com/codingsh">Twitter</Link>
					</li>
					<li className="hover:text-[#D365E3] transition-colors duration-200">
						TikTok
					</li>
				</ul>
			</div>
		</div>
	</footer>
);

export default Footer;
