import type {Metadata} from 'next';
import {locale as rootLocale} from 'next/root-params';
import { query } from '@/lib/vendure/api';
import { GetCustomerAddressesQuery, GetAvailableCountriesQuery } from '@/lib/vendure/queries';
import { AddressesClient } from './addresses-client';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('addressesPageTitle'),
    };
}

export default async function AddressesPage(_props: PageProps<'/[locale]/account/addresses'>) {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Account'});
    const [addressesResult, countriesResult] = await Promise.all([
        query(GetCustomerAddressesQuery, {}, { useAuthToken: true }),
        query(GetAvailableCountriesQuery, {}, { languageCode: locale }),
    ]);

    const addresses = addressesResult.data.activeCustomer?.addresses || [];
    const countries = countriesResult.data.availableCountries || [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{t('addresses')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('manageAddresses')}
                </p>
            </div>

            <AddressesClient addresses={addresses} countries={countries} />
        </div>
    );
}
