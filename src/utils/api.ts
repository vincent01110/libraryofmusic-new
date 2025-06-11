'use server';

import { API } from '@/interfaces/api';
import { cookies } from 'next/headers';

export async function getUserInfo(): Promise<API.V1.Response.User.UserInfo> {
    const response = await get<API.V1.Response.User.UserInfo>('/spotify/me');
    (await cookies()).set('user_info', JSON.stringify(response), {
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 172800,
    });
    return response;
}

export async function getCarousel(): Promise<API.V1.Response.Carousel[]> {
    const response = await get<API.V1.Response.Carousel[]>('/carousel');

    return response;
}

export async function getRandomAlbums(): Promise<API.V1.Response.Spotify.Album[]> {
    const response = await get<API.V1.Response.Spotify.Album[]>('/spotify/album/random?n=3');

    return response;
}

export async function getMyAlbums(limit: number = 20, offset: number): Promise<API.V1.Response.Spotify.UserAlbums> {
    const response = await get<API.V1.Response.Spotify.UserAlbums>(`/spotify/me/albums?limit=${limit}&offset=${offset}`);
    
    return response;
}

export async function getShelves(): Promise<API.V1.Response.Shelves.Shelf[]> {
    const response = await get<API.V1.Response.Shelves.Shelf[]>('/shelf');

    return response;
}

export async function addAlbumToShelf(shelf: API.V1.Response.Shelves.Shelf, album: API.V1.Response.Shelves.ShelfItem) {
    const response = await patch<API.V1.Response.Shelves.Shelf, API.V1.Response.Shelves.ShelfItem>(
        `/shelf/${shelf._id}/add-album`, album);

    return response;
}

export async function createShelf(shelf: API.V1.Request.Shelf) {
    const response = await post<API.V1.Request.Shelf>('/shelf', shelf);

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

        if (response.status === 401) {
            return null as T;
        };

        if (!response.ok) {
            throw new Error(`GET ${uri} failed with status ${response.status}`);
        }

        return await response.json() as T;
    } catch (e: unknown) {
        console.log(e);
        return null as T;
    }
}

async function post<T>(uri: string, data: T): Promise<T> {
    try {
        const token = (await cookies()).get('API_TOKEN')?.value;
        const response = await fetch(`${process.env.API_URL}${uri}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            return null as T;
        };

        if (!response.ok) {
            throw new Error(`POST ${uri} failed with status ${response.status}`);
        }

        return await response.json() as T;
    } catch (e: unknown) {
        console.log(e);
        return null as T;
    }
}

async function patch<T, K>(uri: string, data: K): Promise<T> {
    try {
        const token = (await cookies()).get('API_TOKEN')?.value;
        const response = await fetch(`${process.env.API_URL}${uri}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            return null as T;
        };

        if (!response.ok) {
            throw new Error(`PUT ${uri} failed with status ${response.status}`);
        }

        return await response.json() as T;
    } catch (e: unknown) {
        console.log(e);
        return null as T;
    }
}

