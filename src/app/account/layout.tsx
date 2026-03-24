import type {Metadata} from 'next';
import {Package, User, MapPin} from 'lucide-react';
import {noIndexRobots} from '@/lib/metadata';
import {AccountNavLinks} from '@/components/account/account-nav-links';

export const metadata: Metadata = {
    robots: noIndexRobots(),
};

const navItems = [
    {href: '/account/orders', label: 'Orders', icon: Package},
    {href: '/account/addresses', label: 'Addresses', icon: MapPin},
    {href: '/account/profile', label: 'Profile', icon: User},
];

export default async function AccountLayout({children}: LayoutProps<'/account'>) {
    return (
        <div className="container mx-auto px-4 py-30">
            {/* Mobile: horizontal tab bar */}
            <div className="md:hidden mb-6">
                <AccountNavLinks items={navItems} layout="horizontal" />
            </div>

            <div className="flex gap-8">
                {/* Desktop: sidebar */}
                <aside className="hidden md:block w-64 shrink-0">
                    <AccountNavLinks items={navItems} layout="vertical" />
                </aside>
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
