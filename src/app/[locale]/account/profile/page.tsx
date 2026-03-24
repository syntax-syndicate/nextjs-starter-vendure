import type {Metadata} from 'next';
import { getActiveCustomer } from '@/lib/vendure/actions';
import { ChangePasswordForm } from './change-password-form';
import { EditProfileForm } from './edit-profile-form';
import { EditEmailForm } from './edit-email-form';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('profilePageTitle'),
    };
}

export default async function ProfilePage(_props: PageProps<'/[locale]/account/profile'>) {
    const customer = await getActiveCustomer();
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Account'});

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{t('profile')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('manageAccountInfo')}
                </p>
            </div>

            <EditProfileForm customer={customer} />

            <EditEmailForm currentEmail={customer?.emailAddress || ''} />

            <ChangePasswordForm />
        </div>
    );
}
