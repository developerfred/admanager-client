import React, { useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { globalABI } from "@/config/abi";
import { useAppKitNetwork } from "@/hooks/useAppKitNetwork";
import { Loader2, ExternalLink, Activity, Calendar } from "lucide-react";
import type { Advertisement } from "@/config/contract";

interface MyAdsProps {
  setIsCreateAdOpen: (isOpen: boolean) => void;
}

const EMPTY_STATE_MESSAGES = {
  title: "Your Ad Space Awaits!",
  description: "Ready to make your mark? Create your first ad and watch your influence grow!",
} as const;

const BUTTON_LABELS = {
  createFirst: "🎨 Create Your First Masterpiece",
  createAnother: "🚀 Launch Another Ad",
} as const;

const LOADING_MESSAGE = "Fetching your masterpieces...";
const ERROR_MESSAGE = "Oops! We hit a snag loading your ads. Let's give it another shot!";

const AdCard: React.FC<{ ad: Advertisement; index: number }> = ({ ad, index }) => {
  const formattedDate = useMemo(
    () => new Date(Number(ad.createdAt) * 1000).toLocaleDateString(),
    [ad.createdAt]
  );

  const statusBadgeClass = useMemo(
    () =>
      ad.isActive
        ? "bg-green-500 text-black"
        : "bg-red-500 text-white",
    [ad.isActive]
  );

  return (
    <Card className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#9AEDEF]">
          Ad #{index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <Image
          src={ad.imageUrl}
          alt={`Advertisement ${index + 1}`}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-md shadow-md"
        />
        <div className="flex items-center text-[#D365E3]">
          <ExternalLink className="mr-2 h-4 w-4 flex-shrink-0" />
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {ad.link}
          </a>
        </div>
        <p className="text-[#9AEDEF]">
          Investment: {formatEther(ad.price)} ETH
        </p>
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}
          >
            {ad.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center text-[#D365E3]">
          <Activity className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>Engagements: {ad.engagements.toString()}</span>
        </div>
        <div className="flex items-center text-[#9AEDEF]">
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>Created: {formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingState: React.FC = () => (
  <Card className="bg-black/50 backdrop-blur-md border-0">
    <CardContent className="flex items-center justify-center p-10">
      <Loader2 className="mr-2 h-6 w-6 animate-spin text-[#D365E3]" />
      <p className="text-lg text-[#9AEDEF]">{LOADING_MESSAGE}</p>
    </CardContent>
  </Card>
);

const ErrorState: React.FC = () => (
  <Card className="bg-black/50 backdrop-blur-md border-0 border-red-500">
    <CardContent className="p-6">
      <p className="text-center text-lg text-red-400">{ERROR_MESSAGE}</p>
    </CardContent>
  </Card>
);

const EmptyState: React.FC = () => (
  <Card className="bg-black/50 backdrop-blur-md border-0 border-[#D365E3]">
    <CardContent className="p-8 text-center">
      <h3 className="text-2xl font-bold text-[#9AEDEF] mb-4">
        {EMPTY_STATE_MESSAGES.title}
      </h3>
      <p className="text-lg text-[#D365E3] mb-6">
        {EMPTY_STATE_MESSAGES.description}
      </p>
    </CardContent>
  </Card>
);

const AdGrid: React.FC<{ ads: Advertisement[] }> = ({ ads }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {ads.map((ad, index) => (
      <AdCard key={`ad-${index}`} ad={ad} index={index} />
    ))}
  </div>
);

const MyAds: React.FC<MyAdsProps> = ({ setIsCreateAdOpen }) => {
  const { address } = useAccount();
  const { contractAddress } = useAppKitNetwork();

  const {
    data: userCreatedAds,
    isLoading,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: globalABI,
    functionName: "getUserCreatedAds",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
    },
  });

  const userAds = useMemo(
    () => (userCreatedAds as Advertisement[]) ?? [],
    [userCreatedAds]
  );

  const hasAds = userAds.length > 0;

  const buttonLabel = hasAds
    ? BUTTON_LABELS.createAnother
    : BUTTON_LABELS.createFirst;

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState />;
    if (hasAds) return <AdGrid ads={userAds} />;
    return <EmptyState />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
        Your Ad Gallery
      </h2>
      {renderContent()}
      <Button
        className="w-full py-6 mt-6 bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 text-lg font-bold transition-all duration-300 transform hover:scale-105"
        onClick={() => setIsCreateAdOpen(true)}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default MyAds;