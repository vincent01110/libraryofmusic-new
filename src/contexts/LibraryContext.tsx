'use client';

import { API } from '@/interfaces/api';
import { addAlbumToShelf, getShelves } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LibraryContextType {
    shelves: API.V1.Response.Shelves.Shelf[] | null;
    isLoading: boolean;
    // eslint-disable-next-line no-unused-vars
    addToShelf: (shelf: API.V1.Response.Shelves.Shelf, album: API.V1.Response.Spotify.Album) => void;
    loadShelves: () => void;
}

interface Props {
    children: ReactNode;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: Props) {
    const [shelves, setShelves] = useState<API.V1.Response.Shelves.Shelf[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        loadShelves();
    }, []);

    async function loadShelves() {
        const response = (await getShelves());
        if (!response) {
            router.push('/api/proxy-login');
            return;
        };
        setShelves(response);
        setIsLoading(false);
    };

    function addToShelf(shelf: API.V1.Response.Shelves.Shelf, album: API.V1.Response.Spotify.Album) {
        addAlbumToShelf(shelf, album).then(data => {
            if (data) {
                loadShelves();
            }
        });
    }


    return (
        <LibraryContext.Provider value={{ shelves, isLoading, addToShelf, loadShelves }}>
            { children }
        </LibraryContext.Provider>
    );
}

export function useLibraryContext() {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibraryContext must be used within a LibraryProvider');
    }
    return context;
}