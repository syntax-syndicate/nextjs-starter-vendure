import {locale as rootLocale} from 'next/root-params';
import {cacheLife, cacheTag} from 'next/cache';
import {getTopCollections} from '@/lib/vendure/cached';
import Image from "next/image";
import Link from "next/link";


async function Copyright() {
    'use cache'
    cacheLife('days');

    return (
        <div>
            &copy; {new Date().getFullYear()} Vendure Store. All rights reserved.
        </div>
    )
}

export async function Footer() {
    'use cache'
    cacheLife('days');

    const locale = (await rootLocale()) as string;
    cacheTag(`footer-${locale}`);

    const collections = await getTopCollections(locale);

    return (
        <footer className="border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image src="/vendure.svg" alt="Vendure" width={40} height={27} className="h-6 w-auto dark:invert" />
                        </Link>
                        <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                            A modern, headless e-commerce storefront built with Vendure and Next.js. Fast, flexible, and ready for production.
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold mb-4">Categories</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {collections.map((collection) => (
                                <li key={collection.id}>
                                    <Link
                                        href={`/collection/${collection.slug}`}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {collection.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold mb-4">Customer</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/search"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/orders"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/profile"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold mb-4">Vendure</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="https://github.com/vendure-ecommerce"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://docs.vendure.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/vendure-ecommerce/vendure"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Source Code
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div
                    className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <Copyright/>
                    <div className="flex items-center gap-2">
                        <span>Powered by</span>
                        <a
                            href="https://vendure.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            <Image src="/vendure.svg" alt="Vendure" width={40} height={27} className="h-4 w-auto dark:invert" />
                        </a>
                        <span>&</span>
                        <a
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            <Image src="/next.svg" alt="Next.js" width={16} height={16} className="h-5 w-auto dark:invert" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
