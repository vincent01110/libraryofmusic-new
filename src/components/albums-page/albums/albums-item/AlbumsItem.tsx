'use client';

import { AnimationScope, motion, stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import style from './AlbumsItem.module.scss';
import { API } from '@/interfaces/api';
import { Button } from '@chakra-ui/react';

interface Prop {
    album: API.V1.Response.Spotify.Album;
}

const staggerInfoItems = stagger(0.1, { startDelay: 0.1 });

function useInfoAnimation(showText: boolean): AnimationScope {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            '[data-info]',
            {
                zIndex: showText ? 10 : 1,
            },
            {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
                delay: showText ? staggerInfoItems : 0,
            }
        );

        animate('[data-image]', {
            zIndex: showText ? 1 : 10,
        }, {
            type: 'spring',
            bounce: 1,
            duration: 0.3
        });
    }, [showText]);

    return scope;
}


const AlbumsItem = ({album}: Prop) => {
    const [showText, setShowText] = useState<boolean>(false);
    const scope = useInfoAnimation(showText);

    function toggleShow() {
        setShowText(prev => !prev);
    }


    return <motion.div className={style.container} ref={scope} whileTap={{scale: 0.9}}>
        <motion.img
            src={album.images[0].url}
            alt={`${album.artists[0].name} - ${album.name}`}
            onClick={toggleShow}
            data-image
            className={`${style.image} ${showText ? style.blur : ''}`}
        
        />
        <motion.div data-info className={style.info} onClick={toggleShow}>
            <Button>Add To Shelf</Button>
            <Button>Info</Button>
        </motion.div>
    </motion.div>;
};
 
export default AlbumsItem;
