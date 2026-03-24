'use client';

import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";


interface CartIconProps {
    cartItemCount: number;
}

export function CartIcon({cartItemCount}: CartIconProps) {
    return (
        <Button render={<Link href="/cart" />} variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5"/>
            {cartItemCount > 0 && (
                <span
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
            <span className="sr-only">Shopping Cart</span>
        </Button>
    );
}
