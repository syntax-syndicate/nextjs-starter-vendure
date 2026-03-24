import type {Metadata} from 'next';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';
import {Cart} from "@/app/[locale]/cart/cart";
import {Suspense} from "react";
import {CartSkeleton} from "@/components/shared/skeletons/cart-skeleton";
import {noIndexRobots} from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Cart'});
    return {
        title: t('title'),
        robots: noIndexRobots(),
    };
}

export default async function CartPage(_props: PageProps<'/[locale]/cart'>) {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Cart'});

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

            <Suspense fallback={<CartSkeleton />}>
                <Cart/>
            </Suspense>
        </div>
    );
}
