'use server';

import { API } from '@/interfaces/api';
import { cookies } from 'next/headers';

export async function getUserInfo(): Promise<API.V1.Response.User.UserInfo> {
    const response = await get<API.V1.Response.User.UserInfo>('/spotify/me');
    (await cookies()).set('user_info', JSON.stringify(response), {
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 172800000,
    });
    return response;
}

export async function getCarousel(): Promise<API.V1.Response.Carousel[]> {
    const response = await get<API.V1.Response.Carousel[]>('/carousel');

    return response;
}


async function get<T>(uri: string): Promise<T> {
    try {
        const token = (await cookies()).get('API_TOKEN')?.value;
        const response = await fetch(`${process.env.API_URL}${uri}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`GET ${uri} failed with status ${response.status}`);
        }

        return await response.json() as T;
    } catch (e: unknown) {
        console.log(e);
        return null as T;
    }
}