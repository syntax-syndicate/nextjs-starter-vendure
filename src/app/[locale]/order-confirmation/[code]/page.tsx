import type {Metadata} from 'next';
import {Suspense} from 'react';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';
import {OrderConfirmation} from './order-confirmation';
import {noIndexRobots} from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'OrderConfirmation'});
    return {
        title: t('pageTitle'),
        robots: noIndexRobots(),
    };
}

export default function OrderConfirmationPage(props: PageProps<'/[locale]/order-confirmation/[code]'>) {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
            <OrderConfirmation paramsPromise={props.params} />
        </Suspense>
    );
}
