import { logout } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    await logout();
    return NextResponse.redirect(req.nextUrl.origin, 302);
}   