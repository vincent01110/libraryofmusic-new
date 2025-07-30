'use client';

import { Flex, Text } from '@chakra-ui/react';
import style from './ShelfItemSortable.module.scss';
import { API } from '@/interfaces/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { getArtistsName } from '@/utils/client-utils';

interface Props {
  shelfItem: API.V1.Response.Shelves.ShelfItem,
  index: number
}

const ShelfItemSortable = ({ shelfItem, index }: Props) => {
    const { 
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: `${shelfItem.id}-${index}` });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Flex ref={setNodeRef} style={styles} 
            className={`${style.container} ${isDragging ? style.dragging : ''}`} {...attributes} {...listeners} >
            <Flex className={style.cover}>
                <Image src={shelfItem.images[1].url} alt={shelfItem.name} 
                    fill />
            </Flex>
            <Flex className={style.infoCont}>
                <Flex className={style.info}>
                    <Text className={style.name}>{shelfItem.name}</Text>
                    <Text className={style.artist}>{getArtistsName(shelfItem.artists as API.V1.Response.Artist[])}</Text>
                </Flex>
            </Flex>
        </Flex>);
};

export default ShelfItemSortable;
