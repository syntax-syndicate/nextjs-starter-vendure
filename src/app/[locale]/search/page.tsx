import type {Metadata} from 'next';
import {Suspense} from 'react';
import {locale as rootLocale} from 'next/root-params';
import {getTranslations} from 'next-intl/server';
import {SearchResults} from "@/app/[locale]/search/search-results";
import {SearchTerm, SearchTermSkeleton} from "@/app/[locale]/search/search-term";
import {SearchResultsSkeleton} from "@/components/shared/skeletons/search-results-skeleton";
import {SITE_NAME, noIndexRobots} from '@/lib/metadata';

export async function generateMetadata({
    searchParams,
}: PageProps<'/[locale]/search'>): Promise<Metadata> {
    const resolvedParams = await searchParams;
    const locale = (await rootLocale()) as string;
    const t = await getTranslations({locale, namespace: 'Search'});
    const searchQuery = resolvedParams.q as string | undefined;

    const title = searchQuery
        ? t('resultsTitle', {query: searchQuery})
        : t('pageTitle');

    return {
        title,
        description: searchQuery
            ? `Find products matching "${searchQuery}" at ${SITE_NAME}`
            : `Search our product catalog at ${SITE_NAME}`,
        robots: noIndexRobots(),
    };
}

export default async function SearchPage({searchParams}: PageProps<'/[locale]/search'>) {
    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <Suspense fallback={<SearchTermSkeleton/>}>
                <SearchTerm searchParams={searchParams}/>
            </Suspense>
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults searchParams={searchParams}/>
            </Suspense>
        </div>
    );
}
