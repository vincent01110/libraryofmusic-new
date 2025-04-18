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
        }

    }
}