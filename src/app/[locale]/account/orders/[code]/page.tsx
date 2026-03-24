import type {Metadata} from 'next';
import {Suspense} from 'react';
import {query} from '@/lib/vendure/api';
import {GetOrderDetailQuery} from '@/lib/vendure/queries';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';
import {OrderDetail} from './order-detail';

type OrderDetailPageProps = PageProps<'/[locale]/account/orders/[code]'>;

export async function generateMetadata({params}: OrderDetailPageProps): Promise<Metadata> {
    const {code} = await params;
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('order', {code}),
    };
}

export default function OrderDetailPage(props: PageProps<'/[locale]/account/orders/[code]'>) {
    // Start the fetch in the page (dynamic parent) and pass promise into Suspense.
    // Don't await params here — that would make the page component dynamic.
    const orderPromise = props.params.then(({code}) =>
        query(GetOrderDetailQuery, {code}, {useAuthToken: true, fetch: {}})
    );

    return (
        <Suspense fallback={<div className="p-8 text-center">Loading order...</div>}>
            <OrderDetail orderPromise={orderPromise} />
        </Suspense>
    );
}
