'use client';

import { useLibraryContext } from '@/contexts/LibraryContext';
import { Flex } from '@chakra-ui/react';

const Shelves = () => {
    const { shelves } = useLibraryContext();

    return <Flex>
        <ul>
            {shelves && shelves?.map(s => <li key={s._id}>{s.name} - {s.color}</li>)}
        </ul>
    </Flex>;
};
 
export default Shelves;