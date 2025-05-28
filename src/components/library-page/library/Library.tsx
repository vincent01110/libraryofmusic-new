import { Flex } from '@chakra-ui/react';
import Shelves from './shelves/Shelves';
import style from './Library.module.scss';

const Library = () => {
    return <Flex className={style.library}>
        <Shelves />
    </Flex>;
};
 
export default Library;