import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Address } from 'viem';

interface CreateAdDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    createNewAd: () => Promise<void>;
    isLoading: boolean;
    newAdData: NewAdData;
    setNewAdData: React.Dispatch<React.SetStateAction<NewAdData>>;
}

interface NewAdData {
    link: string;
    imageUrl: string;
    referrer: Address;
}

interface AdFormErrors {
    link: string;
    imageUrl: string;
    referrer: string | Address;
}

const CreateAdDialog: React.FC<CreateAdDialogProps> = ({
    isOpen,
    setIsOpen,
    createNewAd,
    isLoading,
    newAdData = { link: '', imageUrl: '', referrer: '0x0000000000000000000000000000000000000000' },
    setNewAdData,
}) => {
    const [errors, setErrors] = useState<AdFormErrors>({ link: '', imageUrl: '', referrer: '0x0000000000000000000000000000000000000000' });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [newAdData]);

    const validateForm = () => {
        const newErrors: AdFormErrors = { link: '', imageUrl: '', referrer: '0x0000000000000000000000000000000000000000' };
        let isValid = true;

        const validators = {
            link: (value: string) => {
                if (!value) return 'Ad link is required';
                if (!/^https?:\/\/.+/.test(value)) return 'Invalid URL format';
                return '';
            },
            imageUrl: (value: string) => {
                if (!value) return 'Image URL is required';
                if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value)) return 'Invalid image URL format';
                return '';
            },
            referrer: (value: string) => {
                if (value && !/^0x[a-fA-F0-9]{40}$/.test(value)) return 'Invalid Ethereum address';
                return '';
            },
        };

        (Object.keys(newAdData) as Array<keyof NewAdData>).forEach((key) => {
            const error = validators[key](newAdData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewAdData((prev) => ({ ...prev, [id.replace('ad', '').toLowerCase()]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            await createNewAd();
        }
    };

    const renderFormField = (id: keyof NewAdData, label: string, placeholder: string, tooltip?: string) => (
        <div>
            <Label htmlFor={`ad${id.charAt(0).toUpperCase() + id.slice(1)}`} className="text-[#9AEDEF] mb-2 block">
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
                id={`ad${id.charAt(0).toUpperCase() + id.slice(1)}`}
                type="text"
                className="bg-[#1A1A1A] border-[#333] text-white"
                placeholder={placeholder}
                value={newAdData[id] || ''}
                onChange={handleInputChange}
            />
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-black/90 backdrop-blur-md text-white border border-[#333] max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D365E3] to-[#9AEDEF]">Create Your Ad Masterpiece</DialogTitle>
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
                            disabled={isLoading || !isFormValid}
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
}

export default CreateAdDialog;