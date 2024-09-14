import ListingCard from '@/app/components/ListingCard';
import MapFilterItems from '@/app/components/MapFilterItems';
import NoItem from '@/app/components/NoItem';
import SkeletonCard from '@/app/components/SkeletonCard';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getData({
    searchParams,
    userId,
}: {
    searchParams?: { filter?: string };
    userId: string;
}) {
    const data = prisma.home.findMany({
        where: {
            addedCategory: true,
            addedDescription: true,
            addedLoaction: true,
            categoryName: searchParams?.filter ?? undefined,
        },
        select: {
            photo: true,
            id: true,
            price: true,
            description: true,
            country: true,
            Favorite: {
                where: {
                    userId: userId ?? undefined,
                },
            },
        },
    });

    return data;
}

export default function Home({ searchParams }: { searchParams?: { filter?: string } }) {
    return (
        <div className="container mx-auto px-5 lg:px-10">
            <MapFilterItems />

            <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
                <ShowItems searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

async function ShowItems({ searchParams }: { searchParams?: { filter?: string } }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return redirect('/api/auth/login');
    const data = await getData({ searchParams: searchParams, userId: user.id });

    return (
        <>
            {data.length === 0 ? (
                <NoItem
                    description="Please check a other category or create your own listing!"
                    title="Sorry no listings found for this category..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.id}
                            imagePath={item.photo as string}
                            description={item.description as string}
                            location={item.country as string}
                            price={item.price as number}
                            userId={user.id}
                            favoriteId={item.Favorite[0]?.id}
                            isInFavoriteList={item.Favorite.length > 0 ? true : false}
                            homeId={item.id}
                            pathName={'/'}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
}
