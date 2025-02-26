'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button2';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useToast } from '@/src/components/ui/use-toast';
import Loader from '@/src/components/ui/Loader';
import { OrganizationMember } from '@/src/hooks/useOrganizationMember';
import { requestCarbon } from '@/src/utils/carbon';
import { useRouter } from 'next/navigation';

// TODO move this type into a dedicated file
export type APIKey = {
    id: number;
    token_hash: string;
    description?: string;
    customer_id: number;
    customer_email: string;
    organization_id: number;
    organization_name: string,
    is_hashed: boolean;
    expires_at: Date,
    created_at: Date,
    updated_at: Date,
}

const CreateAPIKeys = (
    props: {
        organizationMember: OrganizationMember,
        secret: string,
        setNewKey: (newKey: APIKey) => void,
        getAPIKeys: () => Promise<void>,
    },
) => {
    const [label, setLabel] = useState('My New Key');
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();
    const { user } = useAuthStore();
    const { toast } = useToast();

    const createAPIKey = async () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }
        if (!label) {
            toast({ description: "Please label the new api key." });
            return;
        }

        setIsLoading(true);
        const response = await requestCarbon(
            props.secret,
            "POST",
            "/customer/api_key",
            { 
                user_id: props.organizationMember.id,
                org_id: props.organizationMember.organization_id,
                description: label,
            },
        )

        if (response.status !== 200) {
            toast({
                description: 'API Key Creation Failed',
            });
        } else {
            await props.getAPIKeys()
            const newKey: APIKey = await response.json()

            toast({
                description: 'New API Key Created',
            });
            props.setNewKey(newKey);
            setIsDialogOpen(false); // Close the dialog on success
        }
        setIsLoading(false);
    };

    return (
        <div className="">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {
                    props.organizationMember.organization_admin && (
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Create New API Key
                            </Button>
                        </DialogTrigger>
                    )
                }

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="pb-2">Create New Key</DialogTitle>
                        <DialogDescription className="pb-1">
                            Anyone with this key will be able to access Carbon
                            APIs on behalf of your organization. You can
                            delete the key at any time.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left text-sm">
                                Label
                            </Label>
                            <Input
                                id="name"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={createAPIKey}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader className="mr-2" />}
                            {isLoading ? 'Creating...' : 'Create API Key'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateAPIKeys;
