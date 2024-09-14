/* eslint-disable @next/next/no-img-element */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { createAirbndHome } from '@/app/actions';

export default async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const createHomewithId = createAirbndHome.bind(null, { userId: user?.id as string });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                    <img
                        src={
                            user?.picture ??
                            'https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/456986433_122127798368339032_6565739721709786172_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=1sbNZ3zPNIgQ7kNvgGwulan&_nc_ht=scontent.fdad3-1.fna&_nc_gid=AYd4rwFou6otb9-M-CAUeyJ&oh=00_AYB4drheR8ZMPqJig-62KqqOB8wBhY349lhVW7UrhG1G9A&oe=66E90A86'
                        }
                        alt="Image of the user"
                        className="rounded-full h-8 w-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                        <DropdownMenuItem>
                            <form action={createHomewithId} className="w-full">
                                <button type="submit" className="w-full text-start">
                                    Airbnb your Home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/my-homes" className="w-full">
                                My Listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/favorites" className="w-full">
                                My Favorites
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reservations" className="w-full">
                                My Reservations
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">Logout</LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">Register</RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Login</LoginLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
