import { API } from '@/interfaces/api';

export function getArtistsName(artists: API.V1.Response.Artist[]): string {
    if (artists.length === 1) return artists[0].name;


    let name = artists[0].name;
    for (let i = 1; i < artists.length; i++) {
        name = name.concat(`, ${artists[i].name}`);
    }

    if(artists[0].name === 'Mizmor') console.log(name);
    return name;
}