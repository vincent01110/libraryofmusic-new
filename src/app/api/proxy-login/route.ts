import { isLoggedIn, logout } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
        const redirectTo = `${process.env.API_URL}/auth/login`;
        return NextResponse.redirect(redirectTo, 302);
    }

    await logout();
    return NextResponse.redirect(req.nextUrl.origin, 302);
}   