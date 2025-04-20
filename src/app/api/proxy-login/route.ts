import { NextResponse } from 'next/server';

export async function GET() {
    const redirectTo = `${process.env.API_URL}/auth/login`;
    return NextResponse.redirect(redirectTo, 302);
    
}   