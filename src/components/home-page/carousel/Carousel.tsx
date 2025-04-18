'use client';

import { useCarouselContext } from '@/contexts/CarouselContext';
import style from './Carousel.module.scss';
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import CarouselItem from './carousel-item/CarouselItem';

const Carousel = () => {
    const { albums, positionIndexes, handleNext, handlePrev, positions, variants, background } = useCarouselContext();

    return <div 
        style={{
            background: `linear-gradient(to top, 
                            rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 0%, 
                            rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.05) 25%, 
                            rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.1) 50%, 
                            rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.05) 75%, 
                            rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 100%)`,
        }}
        className={style.container}>
      
        <AnimatePresence> 
            <Suspense fallback={<></>}>
                {albums.map((album, index) => (
                    <CarouselItem
                        positionIndexes={positionIndexes}
                        key={album.id}
                        album={album}
                        index={index}
                        positions={positions}
                        variants={variants}
                    />
                ))}
            </Suspense>
        </AnimatePresence>
        <button className={style.next} onClick={handleNext}>
        
        </button>
        <button className={style.prev} onClick={handlePrev}>
        
        </button>
    </div>;
};
 
export default Carousel;