import { getRandomAlbums } from '@/utils/api';
import { Flex, Spinner } from '@chakra-ui/react';
import style from './RandomAlbum.module.scss';
import { lazy, Suspense } from 'react';

const RandomAlbumItem = lazy(() => import('./random-album-item/RandomAlbumItem'));

const RandomAlbums = async () => {
    const albums = await getRandomAlbums();
    
    return <Flex className={style.container}>
        <Suspense fallback={<Spinner size='xl'/>}>
            {albums.map((a) => <RandomAlbumItem album={a} key={a.id} />)}
        </Suspense>
    </Flex>;
};
 
export default RandomAlbums;