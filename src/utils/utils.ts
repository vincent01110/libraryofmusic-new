'use server';

import { cookies } from 'next/headers';

export async function isLoggedIn(): Promise<boolean> {
    const idk = (await cookies()).has('API_TOKEN');
    console.log(idk);
    return idk;
}