'use client';

import { useLibraryContext } from '@/contexts/LibraryContext';
import { Flex, Text, Icon, Button } from '@chakra-ui/react';
import Shelf from './shelf/Shelf';
import style from './Shelves.module.scss';
import { MdEdit } from 'react-icons/md';
import DeleteShelf from './shelf/delete-shelf/DeleteShelf';
import EditShelf from './shelf/edit-shelf/EditShelf';

const Shelves = () => {
    const { shelves } = useLibraryContext();

    return <Flex className={style.shelves}>
        {shelves && shelves?.map(s => (
            <Flex className={style.shelfWrapper} key={s._id}>
                <Flex className={style.headerContainer}>
                    <Text className={style.name}>{s.name}</Text>
                    <Flex className={style.icons}>
                        <EditShelf shelf={s}>
                            <Button variant='ghost' h='fit-content' w='fit-content'>
                                <Icon className={style.editIcon}><MdEdit /></Icon>
                            </Button>
                        </EditShelf>
                        <DeleteShelf shelf={s} />
                    </Flex>
                </Flex>
                <Shelf key={s._id} shelf={s} />
            </Flex>
        ))}
    </Flex>;
};
 
export default Shelves;