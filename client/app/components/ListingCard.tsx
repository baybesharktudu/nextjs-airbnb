import { addToFavorite, DeleteFromFavorite } from '@/app/actions';
import { AddToFavoriteButton, DeleteFromFavoriteButton } from '@/app/components/SubmitButtons';
import { useCountries } from '@/app/lib/getCountries';
import { MapPinCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface iAppProps {
    imagePath: string;
    description: string;
    location: string;
    price: number;
    userId: string;
    isInFavoriteList: boolean;
    favoriteId: string;
    homeId: string;
    pathName: string;
}

export default function ListingCard({
    imagePath,
    description,
    location,
    price,
    userId,
    isInFavoriteList,
    favoriteId,
    homeId,
    pathName,
}: iAppProps) {
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(location);
    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image
                    src={`https://lyuvwmgnazshmxkvvhew.supabase.co/storage/v1/object/public/images/${imagePath}`}
                    alt="Image of House"
                    fill
                    className="rounded-lg h-full object-cover"
                />

                {userId && (
                    <div className="z-10 absolute top-2 right-2">
                        {isInFavoriteList ? (
                            <form action={DeleteFromFavorite}>
                                <input type="hidden" name="favoriteId" value={favoriteId} />
                                <input type="hidden" name="userId" value={userId} />
                                <input type="hidden" name="pathName" value={pathName} />
                                <DeleteFromFavoriteButton />
                            </form>
                        ) : (
                            <form action={addToFavorite}>
                                <input type="hidden" name="homeId" value={homeId} />
                                <input type="hidden" name="userId" value={userId} />
                                <input type="hidden" name="pathName" value={pathName} />
                                <AddToFavoriteButton />
                            </form>
                        )}
                    </div>
                )}
            </div>
            <Link href={`/home/${homeId}`} className="mt-2">
                <h3 className="flex gap-2 font-medium text-base">
                    <MapPinCheck /> {country?.label} / {country?.region}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">${price}</span> Night
                </p>
            </Link>
        </div>
    );
}
