import { API } from '@/interfaces/api';
import { motion, Variants } from 'framer-motion';
import style from './CarouselItem.module.scss';
import Image from 'next/image';

interface Props {
    positionIndexes: number[],
    positions: string[],
    variants: Variants,
    album: API.V1.Response.Carousel,
    index: number,
}

const CarouselItem = ({ positionIndexes, variants, album, index, positions }: Props) => {
    return <motion.div
        initial="center"
        animate={positions[positionIndexes[index]]}
        variants={variants}
        transition={{ duration: 0.3 }}
        className={style.item}
    >
        <h1 className={`${style.title} ${positionIndexes[0] === index && style.showText}`}>{album.name}</h1>

        <div className={style.holder}>
            <Image
                src={album.images[0].url}
                alt={`${album.artists[0].name} - ${album.name}`}
                fill={true}
                sizes="small"
                priority
            />
        </div>
        <h2 className={`${style.artist} ${positionIndexes[0] === index && style.showText}`}>{album.artists[0].name}</h2>
    
    </motion.div>;
};
 
export default CarouselItem;