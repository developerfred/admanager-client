/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { isAddress } from 'viem';
import { z } from 'zod';

const newAdDataSchema = z.object({
    link: z.string().url('Invalid URL format'),
    imageUrl: z.string().url('Invalid image URL format'),
    referrer: z.union([z.literal(''), z.string().refine(value => isAddress(value), 'Invalid Ethereum address')]),
});

export type NewAdData = z.infer<typeof newAdDataSchema>;

interface CreateAdDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    createNewAd: (data: NewAdData) => Promise<void>;
    isLoading: boolean;
    newAdData: NewAdData;
    setNewAdData: React.Dispatch<React.SetStateAction<NewAdData>>;
}

const CreateAdDialog: React.FC<CreateAdDialogProps> = ({
    isOpen,
    setIsOpen,
    createNewAd,
    isLoading,
    newAdData,
    setNewAdData,
}) => {
    const [errors, setErrors] = useState<Partial<Record<keyof NewAdData, string>>>({});

    useEffect(() => {
        validateForm(newAdData);
    }, [newAdData]);

    const validateForm = (data: NewAdData) => {
        const result = newAdDataSchema.safeParse(data);
        if (result.success) {
            setErrors({});
        } else {
            const newErrors: Partial<Record<keyof NewAdData, string>> = {};
            result.error.issues.forEach((issue) => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as keyof NewAdData] = issue.message;
                }
            });
            setErrors(newErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAdData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                await createNewAd(newAdData);
            } catch (error) {
                console.error('Failed to create ad:', error);
            }
        }
    };

    const renderFormField = (name: keyof NewAdData, label: string, placeholder: string, tooltip?: string) => (
        <div key={name}>
            <Label htmlFor={name} className="text-[#9AEDEF] mb-2 block">
                {label}
                {tooltip && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="inline-block ml-2 h-4 w-4 text-[#D365E3]" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tooltip}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </Label>
            <Input
                id={name}
                name={name}
                type="text"
                className={`bg-[#1A1A1A] border-[#333] text-white ${errors[name] ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                value={newAdData[name]}
                onChange={handleInputChange}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-black/90 backdrop-blur-md text-white border border-[#333] max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">
                        Create Your Ad Masterpiece
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {renderFormField('link', 'Ad Link', 'https://your-product.com')}
                            {renderFormField('imageUrl', 'Image URL', 'https://your-image-host.com/image.jpg')}
                            {renderFormField('referrer', 'Referrer Address', '0x...', 'Enter the Ethereum address of your referrer (if any)')}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-[#9AEDEF]">Ad Preview</h3>
                            <div className="border border-[#333] rounded-lg p-4 bg-[#1A1A1A]">
                                {newAdData.imageUrl ? (
                                    <img src={newAdData.imageUrl} alt="Ad Preview" className="w-full h-48 object-cover rounded-lg mb-2" />
                                ) : (
                                    <div className="w-full h-48 bg-[#333] rounded-lg flex items-center justify-center mb-2">
                                        <p className="text-[#9AEDEF]">Image Preview</p>
                                    </div>
                                )}
                                <p className="text-[#D365E3] truncate">{newAdData.link || 'Your ad link will appear here'}</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isLoading || Object.keys(errors).length > 0}
                            className="bg-gradient-to-r from-[#D365E3] to-[#9AEDEF] text-black hover:opacity-90 py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Your Masterpiece...
                                </>
                            ) : (
                                'Launch Your Ad 🚀'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAdDialog;