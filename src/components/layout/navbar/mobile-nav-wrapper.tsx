import {locale as rootLocale} from 'next/root-params';
import {cacheLife, cacheTag} from 'next/cache';
import {getTopCollections} from '@/lib/vendure/cached';
import {MobileNav} from '@/components/layout/navbar/mobile-nav';

export async function MobileNavWrapper() {
    "use cache";
    cacheLife('days');

    const locale = (await rootLocale()) as string;
    cacheTag(`mobile-nav-${locale}`);

    const collections = await getTopCollections(locale);

    return <MobileNav collections={collections} />;
}
