import {cacheLife} from 'next/cache';
import {getTopCollections} from '@/lib/vendure/cached';
import {MobileNav} from '@/components/layout/navbar/mobile-nav';

export async function MobileNavWrapper() {
    "use cache";
    cacheLife('days');

    const collections = await getTopCollections();

    return <MobileNav collections={collections} />;
}
