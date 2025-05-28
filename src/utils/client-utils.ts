import { API } from '@/interfaces/api';
import ColorThief from 'colorthief';

export function getArtistsName(artists: API.V1.Response.Artist[]): string {
    if (artists.length === 1) return artists[0].name;


    let name = artists[0].name;
    for (let i = 1; i < artists.length; i++) {
        name = name.concat(`, ${artists[i].name}`);
    }

    return name;
}

/**
 * Gets the dominant color from an image.
 * @param imageUrl The URL of the image
 * @returns A Promise resolving to an [r, g, b] array
 */
export async function getBackgroundColor(imageUrl: string): Promise<[number, number, number]> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Needed if the image is from another domain
        img.src = imageUrl;

        img.onload = () => {
            try {
                const colorThief = new ColorThief();
                const color = colorThief.getPalette(img);
                resolve(color[0]); // return the most dominant
            } catch (err) {
                reject(err);
            }
        };

        img.onerror = () => reject(new Error('Failed to load image for color extraction.'));
    });
}