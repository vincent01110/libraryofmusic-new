import { API } from '@/interfaces/api';
import { Flex } from '@chakra-ui/react';
import ShelfItem from './shelf-item/ShelfItem';
import style from './Shelf.module.scss';

interface Prop {
    shelf: API.V1.Response.Shelves.Shelf;
}

const Shelf = ({ shelf }: Prop) => {
    return (<Flex className={style.shelf} style={{ borderColor: shelf.color }}>
        { shelf.items.map((a, i) => (
            <ShelfItem key={`${shelf._id}-${a.id}-${i}`} album={a} />
        )) }
    </Flex>);
};
 
export default Shelf;