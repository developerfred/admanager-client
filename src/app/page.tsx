/* eslint-disable @typescript-eslint/no-unused-vars, @next/next/no-img-element, react/no-unescaped-entities, @typescript-eslint/no-empty-interface */
"use client"

import React, { useState, useEffect } from 'react';
import { createPublicClient, http, createWalletClient, custom, parseAbi, formatEther, parseEther } from 'viem';
import { base } from 'viem/chains';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, Upload, ChevronRight, ThumbsUp, Loader2, Menu } from 'lucide-react';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton'

const contractABI = parseAbi([
  'function getCurrentAd() view returns (string, string, uint256, address, address, bool, uint256)',
  'function createAdvertisement(string _link, string _imageUrl, address _referrer) payable',
  'function getNextAdPrice() view returns (uint256)'
]);

const contractAddress = '0x020243968704ccF8202Afd1F1134a90953385877';

const publicClient = createPublicClient({
  chain: base,
  transport: http()
});

export default function EnhancedAdManager() {
  const [currentAd, setCurrentAd] = useState(null);
  const [nextAdPrice, setNextAdPrice] = useState('');
  const [newAdLink, setNewAdLink] = useState('');
  const [newAdImageUrl, setNewAdImageUrl] = useState('');
  const [newAdReferrer, setNewAdReferrer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [adImage, setAdImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    setIsLoading(true);
    setError('');
    try {
      const [ad, price] = await Promise.all([
        publicClient.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: 'getCurrentAd',
        }),
        publicClient.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: 'getNextAdPrice',
        })
      ]);

      setCurrentAd(ad);
      setNextAdPrice(formatEther(price));
    } catch (error) {
      console.error("An error occurred:", error);
      setError('Failed to load blockchain data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewAd() {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to create an ad.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const walletClient = createWalletClient({
        chain: base,
        transport: custom(window.ethereum)
      });

      const [address] = await walletClient.requestAddresses();
      const price = await publicClient.readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getNextAdPrice',
      });

      const { request } = await publicClient.simulateContract({
        account: address,
        address: contractAddress,
        abi: contractABI,
        functionName: 'createAdvertisement',
        args: [newAdLink, newAdImageUrl, newAdReferrer || '0x0000000000000000000000000000000000000000'],
        value: price,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      await loadBlockchainData();
      setIsCreateAdOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setError('Failed to create ad. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const topAds = [
    { id: 1, title: "Girl Power Merch", engagements: 15000, image: "https://via.placeholder.com/100" },
    { id: 2, title: "Retro Phone Cases", engagements: 12000, image: "https://via.placeholder.com/100" },
    { id: 3, title: "Neon Vibes Only", engagements: 10000, image: "https://via.placeholder.com/100" },
  ];

  const topEngagers = [
    { id: 1, address: "0x1234...5678", engagements: 5000 },
    { id: 2, address: "0x5678...9012", engagements: 4500 },
    { id: 3, address: "0x9012...3456", engagements: 4000 },
  ];

  const achievements = [
    { id: 1, name: "Ad Creator", description: "Create your first ad", progress: 100 },
    { id: 2, name: "Engagement Master", description: "Reach 1000 engagements", progress: 75 },
    { id: 3, name: "Referral Queen", description: "Refer 10 new advertisers", progress: 50 },
  ];

  const communityChallenge = {
    description: "Reach 100,000 total engagements across all ads",
    goal: 100000,
    currentProgress: 75000,
    reward: 1000,
    deadline: "7 days left",
  };

  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] min-h-screen text-white font-sans">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <header className="relative bg-black/50 backdrop-blur-md p-4 sm:p-6 border-b border-[#333]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">a+</h1>
          <nav className="hidden sm:flex space-x-4">
            <Button className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" className="border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3] hover:text-black"><ConnectButton /></Button>
          </nav>
          <Button variant="ghost" className="sm:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 space-y-2">
            <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" className="w-full border-[#D365E3] text-[#D365E3] hover:bg-[#D365E3] hover:text-black">Login</Button>
          </div>
        )}
      </header>


      <main className="relative max-w-7xl mx-auto mt-6 sm:mt-12 p-4 sm:p-6 z-10">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-black/50 backdrop-blur-md rounded-full p-1">
            <TabsTrigger value="dashboard" className="rounded-full">Dashboard</TabsTrigger>
            <TabsTrigger value="my-ads" className="rounded-full">My Ads</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-full">Achievements</TabsTrigger>
            <TabsTrigger value="community" className="rounded-full">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-6 sm:mb-8 overflow-hidden bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
                  <CardContent className="p-0">
                    <img src={currentAd ? currentAd[1] : "https://i.imgur.com/Ts32Art.jpeg"} alt="Featured Ad" className="w-full h-48 sm:h-64 object-cover" />
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-[#D365E3]/20 to-[#9AEDEF]/20 backdrop-blur-sm">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                        Premium Ad Spot
                      </h2>
                      <p className="mb-4 text-white/80 text-sm sm:text-base">
                        Take what you need, babess. Advertise your product or service on our platform!
                      </p>                      
                      <Button className="w-full sm:w-auto bg-white text-black hover:bg-[#D365E3] transition-colors duration-300" onClick={() => setIsCreateAdOpen(true)}>
                        Create Ad
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Top Performing Ads</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topAds.map(ad => (
                    <Card key={ad.id} className="bg-black/50 backdrop-blur-md border-0 hover:shadow-lg hover:shadow-[#D365E3]/20 transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-4">
                        <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover mb-2 rounded" />
                        <h3 className="font-bold text-[#9AEDEF] mb-1">{ad.title}</h3>
                        <p className="text-sm text-[#D365E3] mb-2">{ad.engagements} engagements</p>
                        <Button
                          className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 transition-all duration-300"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Engage
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="mb-8 bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#9AEDEF]/20">
                  <CardHeader>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Top Engaging Wallets</h2>
                  </CardHeader>
                  <CardContent>
                    {topEngagers.map((engager, index) => (
                      <div key={engager.id} className={`flex justify-between items-center ${index !== 0 ? 'border-t border-[#333]' : ''} py-2`}>
                        <span className="text-[#D365E3]">{engager.address}</span>
                        <span className="font-bold text-[#9AEDEF]">{engager.engagements} engagements</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-black/50 backdrop-blur-md border-0 shadow-lg shadow-[#D365E3]/20">
                  <CardHeader>
                    <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Special Event</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#D365E3] mb-2">Double Rewards Weekend!</p>
                    <p className="text-sm text-white/80">Engage with ads this weekend to earn double the usual rewards.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">Participate Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-ads">
            <h2 className="text-2xl font-bold mb-4">My Advertisements</h2>
            <Card className="bg-black/50 backdrop-blur-md border-0">
              <CardContent className="p-6">
                {currentAd ? (
                  <div className="space-y-2">
                    <p><span className="font-semibold text-[#9AEDEF]">Link:</span> {currentAd[0]}</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Image URL:</span> {currentAd[1]}</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Price:</span> {formatEther(currentAd[2])} ETH</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Advertiser:</span> {currentAd[3]}</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Referrer:</span> {currentAd[4]}</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Is Active:</span> {currentAd[5] ? 'Yes' : 'No'}</p>
                    <p><span className="font-semibold text-[#9AEDEF]">Engagements:</span> {currentAd[6].toString()}</p>
                  </div>
                ) : (
                  <p className="text-center text-lg mb-4">You haven't created any ads yet.</p>
                )}
                <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90" onClick={() => setIsCreateAdOpen(true)}>
                  {currentAd ? 'Create Another Ad' : 'Create Your First Ad'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id} className="bg-black/50 backdrop-blur-md border-0">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-[#9AEDEF]">{achievement.name}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2 text-white/80">{achievement.description}</p>
                    <Progress value={achievement.progress} className="w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Community Challenge</h2>
            <Card className="bg-black/50 backdrop-blur-md border-0">
              <CardHeader>
                <h3 className="text-xl font-bold text-[#9AEDEF]">{communityChallenge.description}</h3>
              </CardHeader>
              <CardContent>
                <Progress value={(communityChallenge.currentProgress / communityChallenge.goal) * 100} className="w-full mb-4" />
                <p className="text-sm mb-2 text-white/80">Progress: {communityChallenge.currentProgress} / {communityChallenge.goal}</p>
                <p className="text-sm mb-2 text-white/80">Reward: {communityChallenge.reward} A+ Tokens</p>
                <p className="text-sm text-white/80">{communityChallenge.deadline}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">Contribute Now</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isCreateAdOpen} onOpenChange={setIsCreateAdOpen}>
        <DialogContent className="bg-black/90 backdrop-blur-md text-white border border-[#333]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Create New Advertisement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adLink" className="text-right">Link</Label>
              <Input
                id="adLink"
                type="url"
                className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                placeholder="https://"
                value={newAdLink}
                onChange={(e) => setNewAdLink(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adImageUrl" className="text-right">Image URL</Label>
              <Input
                id="adImageUrl"
                type="url"
                className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                placeholder="https://"
                value={newAdImageUrl}
                onChange={(e) => setNewAdImageUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adReferrer" className="text-right">Referrer</Label>
              <Input
                id="adReferrer"
                type="text"
                className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                placeholder="0x..."
                value={newAdReferrer}
                onChange={(e) => setNewAdReferrer(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createNewAd} disabled={isLoading} className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Ad...
                </>
              ) : (
                'Create Ad'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="relative bg-black/50 backdrop-blur-md text-white mt-16 py-8 border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-[#9AEDEF]">About us</h3>
            <ul className="space-y-2">
              <li className="hover:text-[#D365E3] transition-colors duration-200">History</li>
              <li className="hover:text-[#D365E3] transition-colors duration-200">Github</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-[#9AEDEF]">Social Media</h3>
            <ul className="space-y-2">
              <li className="hover:text-[#D365E3] transition-colors duration-200">Instagram</li>
              <li className="hover:text-[#D365E3] transition-colors duration-200">Twitter</li>
              <li className="hover:text-[#D365E3] transition-colors duration-200">TikTok</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}