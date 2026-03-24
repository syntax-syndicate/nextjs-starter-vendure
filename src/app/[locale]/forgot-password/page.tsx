import type {Metadata} from 'next';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';
import { ForgotPasswordForm } from './forgot-password-form';

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Auth'});
    return {
        title: t('forgotPasswordPageTitle'),
    };
}

export default async function ForgotPasswordPage(_props: PageProps<'/[locale]/forgot-password'>) {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}
