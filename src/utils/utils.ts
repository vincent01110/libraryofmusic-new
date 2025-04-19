'use server';

import { cookies } from 'next/headers';

export async function isLoggedIn(): Promise<boolean> {
    const isLoggedIn = (await cookies()).has('API_TOKEN');

    return isLoggedIn;
}

export async function logout() {
    (await cookies()).delete('API_TOKEN');
    (await cookies()).delete('user_info');
}