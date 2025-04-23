/* eslint-disable @typescript-eslint/no-namespace */
export namespace API {
    export namespace V1 {
        export namespace Response {
            export interface Image {
                url: string,
                height: number,
                width: number
            }

            export interface Artist {
                href: string,
                id: string,
                name: string,
                type: string,
                uri: string,
                external_urls: string[]
            }

            export namespace User {
                export interface UserInfo {
                    country: string,
                    display_name: string,
                    email: string,
                    explicit_content: {
                        filter_enabled: boolean,
                        filter_locked: boolean
                    },
                    external_urls: {
                        spotify: string
                    },
                    followers: {
                        href: string,
                        total: number
                    },
                    href: string,
                    id: string,
                    images: Image[],
                    product: string,
                    type: string,
                    uri: string

                }
            }

            export interface Carousel {
                _id: string,
                id: string,
                images: Image[],
                name: string,
                artists: Artist[]
            }

            export namespace Spotify {

                interface Copyright {
                    text: string,
                    type: string
                }

                interface TrackItem {
                    artists: Artist[],
                    available_markets: string[],
                    disc_number: number,
                    duration_ms: number,
                    explicit: boolean,
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    is_playable: boolean,
                    linked_from: {
                        external_urls: {
                            spotify: string
                        },
                        href: string,
                        id: string,
                        type: string,
                        uri: string
                    },
                    restrictions: {
                        reason: string
                    },
                    name: string,
                    preview_url: string,
                    track_number: number,
                    type: string,
                    uri: string,
                    is_local: boolean
                }

                export interface Album {
                    album_type: string,
                    total_tracks: number,
                    available_markets: string[],
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    images: Image[],
                    name: string,
                    release_date: string,
                    release_date_precision: string,
                    restrictions: {
                        reason: string
                    },
                    type: string,
                    uri: string,
                    artists: Artist[],
                    tracks: {
                        href: string,
                        limit: number,
                        next: string,
                        offset: number,
                        previous: string,
                        total: number,
                        items: TrackItem[]
                    },
                    copyrights: Copyright[],
                    external_ids: {
                        isrc: string,
                        ean: string,
                        upc: string
                    },
                    genres: [],
                    label: string,
                    popularity: number
                }

                export interface UserAlbum {
                    added_at: string,
                    album: Album;
                }

                export interface UserAlbums {
                    href: string,
                    limit: number,
                    next: string,
                    offset: number,
                    previous: string,
                    total: number,
                    items: UserAlbum[],
                }
            }

            export namespace Shelves {
                export interface Shelf {
                    _id: string,
                    user: string,
                    name: string,
                    color: string,
                    items: Spotify.Album[],
                    createdAt: string,
                    __v: number
                }
            }

        }
    }
}