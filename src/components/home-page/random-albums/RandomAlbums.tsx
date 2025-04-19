import { getRandomAlbums } from '@/utils/api';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import style from './RandomAlbum.module.scss';
import { lazy, Suspense } from 'react';

const RandomAlbumItem = lazy(() => import('./random-album-item/RandomAlbumItem'));

const RandomAlbums = async () => {
    const albums = await getRandomAlbums();

    if (!albums) return <></>;
    
    return <Flex className={style.container}>
        <Text fontSize='3xl'>Your Next Listen:</Text>
        <Flex className={`${style.container} ${style.albums}`}>
            <Suspense fallback={<Spinner size='xl'/>}>
                {albums.map((a) => <RandomAlbumItem album={a} key={a.id} />)}
            </Suspense>
        </Flex>
    </Flex>;
};
 
export default RandomAlbums;