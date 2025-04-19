'use client';

import { Button, Flex, Icon, Spinner } from '@chakra-ui/react';
import AlbumsItem from './albums-item/AlbumsItem';
import style from './Albums.module.scss';
import { useAlbumsContext } from '@/contexts/AlbumsContext';
import { CiCircleMore } from 'react-icons/ci';

const Albums = () => {
    const {albums, handleNext, isLoading} = useAlbumsContext();

    return <Flex className={style.container}>
        <Flex wrap='wrap' className={`${style.container} ${style.albums}`}>
            {albums && albums.map(a => <AlbumsItem key={a.album.id} album={a.album} />)}
        </Flex>
        <Flex className={style.buttonContainer}>
            {isLoading ? 
                <Spinner />
                :
                <Button variant='ghost' disabled={isLoading} className={style.moreButton} onClick={handleNext}>
                More
                    <Icon>
                        <CiCircleMore />
                    </Icon>
                </Button>}
        </Flex>
    </Flex>;
};
 
export default Albums;