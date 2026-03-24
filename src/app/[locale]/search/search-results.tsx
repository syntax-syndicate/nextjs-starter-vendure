import {Suspense} from "react";
import {FacetFilters} from "@/components/commerce/facet-filters";
import {ProductGridSkeleton} from "@/components/shared/product-grid-skeleton";
import {ProductGrid} from "@/components/commerce/product-grid";
import {buildSearchInput, getCurrentPage} from "@/lib/search-helpers";
import {getLocale} from "next-intl/server";
import {query} from "@/lib/vendure/api";
import {SearchProductsQuery} from "@/lib/vendure/queries";

interface SearchResultsProps {
    searchParams: Promise<{
        page?: string
    }>
}

export async function SearchResults({searchParams}: SearchResultsProps) {
    const searchParamsResolved = await searchParams;
    const locale = await getLocale();
    const page = getCurrentPage(searchParamsResolved);

    const productDataPromise = query(SearchProductsQuery, {
        input: buildSearchInput({searchParams: searchParamsResolved})
    }, {languageCode: locale});


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg"/>}>
                    <FacetFilters productDataPromise={productDataPromise}/>
                </Suspense>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
                <Suspense fallback={<ProductGridSkeleton/>}>
                    <ProductGrid productDataPromise={productDataPromise} currentPage={page} take={12}/>
                </Suspense>
            </div>
        </div>
    )
}