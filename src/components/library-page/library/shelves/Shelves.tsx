'use client';

import { useLibraryContext } from '@/contexts/LibraryContext';
import { Flex, Text, Icon } from '@chakra-ui/react';
import Shelf from './shelf/Shelf';
import style from './Shelves.module.scss';
import { MdEdit } from 'react-icons/md';
import DeleteShelf from './shelf/delete-shelf/DeleteShelf';

const Shelves = () => {
    const { shelves } = useLibraryContext();

    return <Flex className={style.shelves}>
        {shelves && shelves?.map(s => (
            <Flex className={style.shelfWrapper} key={s._id}>
                <Flex className={style.headerContainer}>
                    <Text className={style.name}>{s.name}</Text>
                    <Flex className={style.icons}>
                        <Icon className={style.editIcon}><MdEdit /></Icon>
                        <DeleteShelf shelf={s} />
                    </Flex>
                </Flex>
                <Shelf key={s._id} shelf={s} />
            </Flex>
        ))}
    </Flex>;
};
 
export default Shelves;