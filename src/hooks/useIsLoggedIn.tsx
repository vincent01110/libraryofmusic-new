import { cookies } from 'next/headers';

export async function useIsLoggedIn(): Promise<boolean> {
    const store = await cookies();
    const isLoggedIn = store.get('API_TOKEN');
    
    return !!isLoggedIn?.value;
}