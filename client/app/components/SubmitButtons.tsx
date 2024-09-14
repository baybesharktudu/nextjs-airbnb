'use client';

import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function CreationSubmit() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled type="submit" size={'lg'}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                </Button>
            ) : (
                <Button type="submit" size={'lg'}>
                    Next
                </Button>
            )}
        </>
    );
}

export function AddToFavoriteButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button
                    disabled
                    size={'icon'}
                    variant={'outline'}
                    className="bg-primary-foreground"
                >
                    <Loader2 className="text-primary h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart />
                </Button>
            )}
        </>
    );
}

export function DeleteFromFavoriteButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button
                    disabled
                    size={'icon'}
                    variant={'outline'}
                    className="bg-primary-foreground"
                >
                    <Loader2 className="text-primary h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className="bg-primary-foreground"
                    type="submit"
                >
                    <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
                </Button>
            )}
        </>
    );
}
