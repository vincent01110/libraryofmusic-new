'use client';

import { API } from '@/interfaces/api';
import { getCarousel } from '@/utils/api';
import { Variants } from 'framer-motion';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import ColorThief from 'colorthief';

interface UserContextType {
    albums: API.V1.Response.Carousel[];
    positionIndexes: number[];
    handleNext: () => void;
    handlePrev: () => void;
    positions: string[];
    variants: Variants;
    background: number[];
}

interface Props {
    children: ReactNode;
    initialAlbums?: API.V1.Response.Carousel[];
}

const CarouselContext = createContext<UserContextType | undefined>(undefined);

const positions = [
    'center',
    'left1',
    'left2',
    'left3',
    'right3',
    'right2',
    'right1',
];

const variants: Variants = {
    center: { x: 0, scale: 1, zIndex: 6 },
    left1: { x: '-100%', scale: 0.8, zIndex: 4, filter: 'blur(2px)' },
    left2: { x: '-110%', scale: 0.7, zIndex: 3, filter: 'blur(2px)' },
    left3: { x: '-120%', scale: 0.6, zIndex: 2, filter: 'blur(2px)' },
    right3: { x: '120%', scale: 0.6, zIndex: 1, filter: 'blur(2px)' },
    right2: { x: '110%', scale: 0.7, zIndex: 3, filter: 'blur(2px)' },
    right1: { x: '100%', scale: 0.8, zIndex: 4, filter: 'blur(2px)' },
};

export function CarouselProvider({ children, initialAlbums }: Props) {
    const [albums, setAlbums] = useState<API.V1.Response.Carousel[] | []>(initialAlbums ?? []);
    const [positionIndexes, setPositionIndexes] = useState<number[]>([6, 5, 4, 3, 2, 1, 0]);
    const [background, setBackground] = useState<number[]>([0, 0, 0]);

    useEffect(() => {
        const loadCarousel = async () => {
            if (!albums) {
                const carousel = await getCarousel();
                setAlbums(carousel);
            }
        };

        loadCarousel();
    });

    useEffect(() => {
        function getBackGroundColor() {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = albums[positionIndexes[0]].images[0].url;
            img.onload = () => {
                img.width = 100;
                img.height = 100;

                const colorThief = new ColorThief();
                const color = colorThief.getPalette(img);
                setBackground(color[color.length - 1]);
            };
        };

        getBackGroundColor();
    }, [positionIndexes]);

    function handleNext() {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((index) => (index + 1) % 7);
            return updatedIndexes;
        });
    };

    function handlePrev() {
        setPositionIndexes((prevIndexes) => {
            const updatedIndexes = prevIndexes.map((index) => (index + 6) % 7);
            return updatedIndexes;
        });
    };


    return (
        <CarouselContext.Provider value={{ albums, positionIndexes, handleNext, handlePrev, positions, variants, background }}>
            { children }
        </CarouselContext.Provider>
    );
}

export function useCarouselContext() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarousel must be used within a CarouselProvider');
    }
    return context;
}