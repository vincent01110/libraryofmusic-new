'use client';

import { useLibraryContext } from '@/contexts/LibraryContext';
import { Flex, Text } from '@chakra-ui/react';
import Shelf from './shelf/Shelf';
import style from './Shelves.module.scss';

const Shelves = () => {
    const { shelves } = useLibraryContext();

    return <Flex className={style.shelves}>
        {shelves && shelves?.map(s => (
            <Flex className={style.shelfWrapper} key={s._id}>
                <Text className={style.name}>{s.name}</Text>
                <Shelf key={s._id} shelf={s} />
            </Flex>
        ))}
    </Flex>;
};
 
export default Shelves;