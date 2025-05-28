'use client';

import { API } from '@/interfaces/api';
import { motion } from 'framer-motion';
import style from './ShelfItem.module.scss';
import { Span, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getBackgroundColor } from '@/utils/client-utils';

interface Prop {
    album: API.V1.Response.Shelves.ShelfItem;
}

const ShelfItem = ({ album }: Prop) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<number[]>([44, 44, 44]);

    const handleClick = () => {
        setIsClicked(prev => !prev);
    };

    useEffect(() => {
        getBackgroundColor(album.images[0].url).then((data) => setBgColor(data));
    }, [album.images]);

    return (<motion.div
        className={`${style.wrapper} ${isClicked ? style.expanded : style.collapsed}`}
        onClick={handleClick}
        transition={{ type: 'tween', stiffness: 150, damping: 20 }}
    >
        <div className={style.albumCard} style={{ backgroundColor: `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, 0.5)` }}>
            {/* Album Cover */}
            <motion.img
                src={album.images[1].url}
                alt={`${album.name} cover`}
                className={style.cover}
                initial={{ opacity: 0 }}
                animate={{ opacity: isClicked ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />

            {/* Text */}
            <motion.div
                className={style.text}
                animate={{
                    rotate: isClicked ? 0 : 90,
                    scale: isClicked ? 1 : 0.8,
                }}
                transition={{ type: 'tween', stiffness: 200, damping: 15 }}
            >
                <Text className={`${style.title} ${isClicked && style.openTitle}`}>
                    {isClicked && <><Span className={style.artist}>{album.artists[0].name}</Span><br /></>}{album.name} 
                </Text>
            </motion.div>
        </div>
    </motion.div>
    );
};
 
export default ShelfItem;