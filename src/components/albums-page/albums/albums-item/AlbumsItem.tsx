'use client';

import { AnimationScope, motion, stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import style from './AlbumsItem.module.scss';
import { API } from '@/interfaces/api';
import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { CiCircleInfo } from 'react-icons/ci';
import { getArtistsName } from '@/utils/client-utils';

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


    return  (
        <motion.div className={style.container} ref={scope} whileTap={{ scale: 0.9 }}>
    
            <motion.img
                src={album.images[0].url}
                alt={`${album.artists[0].name} - ${album.name}`}
                onClick={toggleShow}
                data-image
                className={`${style.image} ${showText ? style.blur : ''}`}
            />

            <motion.div data-info className={style.info} onClick={toggleShow}>
                <Button className={style.addButton}>Add To Shelf<Icon><IoMdAddCircleOutline /></Icon></Button>
                <Button className={style.infoButton}>Info<Icon><CiCircleInfo /></Icon></Button>
            </motion.div>

            <Flex className={style.bottomInfo} >
                <Text fontSize='medium' className={style.title}>{album.name}</Text>
                <Text fontSize='small' className={style.artist}>{getArtistsName(album.artists)}</Text>
            </Flex>
        </motion.div>);
};
 
export default AlbumsItem;
