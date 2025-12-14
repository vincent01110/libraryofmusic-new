'use client';

import { API } from '@/interfaces/api';
import { getMyAlbums } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface AlbumsContextType {
    albums: API.V1.Response.Spotify.UserAlbum[] | null;
    handleNext: () => void;
    isLoading: boolean;
}

interface Props {
    children: ReactNode;
    enabled: boolean;
}

const AlbumsContext = createContext<AlbumsContextType | undefined>(undefined);

export function AlbumsProvider({ children, enabled }: Props) {
    const [albums, setAlbums] = useState<API.V1.Response.Spotify.UserAlbum[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [max, setMax] = useState<number>(-1);
    const router = useRouter();

    const loadUserAlbums = useCallback(async (offset: number) => {
        if (max === -1 || max > offset) {
            const response = (await getMyAlbums(undefined, offset));
            if (!response) {
                router.push('/api/proxy-login');
                return;
            };
            setAlbums(prevState => [...prevState, ...response.items]);
            setIsLoading(false);
            if (max === -1) setMax(response.total);
        }
    }, [max, router]);

    useEffect(() => {
        if (enabled && albums.length < 1) {
            setIsLoading(true);
            setOffset(0);
            loadUserAlbums(0);
        }
    }, [enabled, albums.length, loadUserAlbums]);
    
    function handleNext() {
        setIsLoading(true); 
        const newOffset = offset + 20;
        setOffset(newOffset);
        loadUserAlbums(newOffset);
    };

    if (!enabled) {
        return <>{ children }</>;
    }


    return (
        <AlbumsContext.Provider value={{ albums, handleNext, isLoading }}>
            { children }
        </AlbumsContext.Provider>
    );
}

export function useAlbumsContext() {
    const context = useContext(AlbumsContext);
    if (!context) {
        throw new Error('useAlbumsContext must be used within a AlbumsProvider');
    }
    return context;
}