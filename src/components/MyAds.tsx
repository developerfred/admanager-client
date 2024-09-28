import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatEther, Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { globalABI } from "@/config/abi";
import { Loader2, ExternalLink, Activity, Calendar } from "lucide-react";

interface Advertisement {
  link: string;
  imageUrl: string;
  price: bigint;
  advertiser: Address;
  referrer: Address;
  isActive: boolean;
  engagements: bigint;
  createdAt: bigint;
}

interface MyAdsProps {
  setIsCreateAdOpen: (isOpen: boolean) => void;
  contractAddress: Address;
}

const MyAds: React.FC<MyAdsProps> = ({
  setIsCreateAdOpen,
  contractAddress,
}) => {
  const { address } = useAccount();
  const [userAds, setUserAds] = useState<Advertisement[]>([]);

  const {
    data: userCreatedAds,
    isLoading,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: globalABI,
    functionName: "getUserCreatedAds",
    args: address ? [address] : undefined,    
  });

  useEffect(() => {
    if (userCreatedAds) {
      setUserAds(userCreatedAds as Advertisement[]);
    }
  }, [userCreatedAds]);

  const renderAdCard = (ad: Advertisement, index: number) => (
    <Card
      key={index}
      className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300"
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#9AEDEF]">
          Ad #{index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <Image
          src={ad.imageUrl}
          alt={`Ad ${index + 1}`}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-md shadow-md"
        />
        <p className="flex items-center text-[#D365E3]">
          <ExternalLink className="mr-2 h-4 w-4" />
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {ad.link}
          </a>
        </p>
        <p className="text-[#9AEDEF]">
          Investment: {formatEther(ad.price)} ETH
        </p>
        <p className="flex items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              ad.isActive ? "bg-green-500 text-black" : "bg-red-500 text-white"
            }`}
          >
            {ad.isActive ? "Active" : "Inactive"}
          </span>
        </p>
        <p className="flex items-center text-[#D365E3]">
          <Activity className="mr-2 h-4 w-4" />
          Engagements: {ad.engagements.toString()}
        </p>
        <p className="flex items-center text-[#9AEDEF]">
          <Calendar className="mr-2 h-4 w-4" />
          Created: {new Date(Number(ad.createdAt) * 1000).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card className="bg-black/50 backdrop-blur-md border-0">
          <CardContent className="flex items-center justify-center p-10">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-[#D365E3]" />
            <p className="text-lg text-[#9AEDEF]">
              Fetching your masterpieces...
            </p>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card className="bg-black/50 backdrop-blur-md border-0 border-red-500">
          <CardContent className="p-6">
            <p className="text-center text-lg text-red-400">
                    Oops! We hit a snag loading your ads. Let&apos;s give it another shot!
            </p>
          </CardContent>
        </Card>
      );
    }

    if (userAds.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAds.map(renderAdCard)}
        </div>
      );
    }

    return (
      <Card className="bg-black/50 backdrop-blur-md border-0 border-[#D365E3]">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-[#9AEDEF] mb-4">
            Your Ad Space Awaits!
          </h3>
          <p className="text-lg text-[#D365E3] mb-6">
            Ready to make your mark? Create your first ad and watch your
            influence grow!
          </p>
        </CardContent>
      </Card>
    );
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
        {userAds.length > 0
          ? "🚀 Launch Another Ad"
          : "🎨 Create Your First Masterpiece"}
      </Button>
    </div>
  );
};

export default MyAds;
