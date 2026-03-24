import {User} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from "next/link";
import {LoginButton} from "@/components/layout/navbar/login-button";
import {getActiveCustomer} from "@/lib/vendure/actions";


export async function NavbarUser() {
    const customer = await getActiveCustomer()

    if (!customer) {
        return (
            <Button render={<LoginButton isLoggedIn={false} />} nativeButton={false} variant="ghost" />
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" />}>
                <User className="h-5 w-5"/>
                Hi, {customer.firstName}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem render={<Link href="/account/profile" />}>Profile</DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/account/orders" />}>Orders</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem render={<LoginButton isLoggedIn={true} />} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
