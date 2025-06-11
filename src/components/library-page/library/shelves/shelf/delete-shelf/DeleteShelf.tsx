'use client';

import { Button, Flex, Icon, Popover, Portal, Span, Text } from '@chakra-ui/react';
import style from './DeleteShelf.module.scss';
import { MdDelete } from 'react-icons/md';
import { API } from '@/interfaces/api';
import { useState } from 'react';
import { deleteShelf } from '@/utils/api';
import { useLibraryContext } from '@/contexts/LibraryContext';

interface Prop {
  shelf: API.V1.Response.Shelves.Shelf
}


const DeleteShelf = ({ shelf }: Prop) => {
    const [open, setOpen] = useState<boolean>(false);
    const { loadShelves } = useLibraryContext();

    function handleConfirm() {
        deleteShelf(shelf).then((data) => {
            if (data.code === 200) {
                setOpen(false);
                loadShelves();
            }
        });
    }

    return (
        <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Popover.Trigger asChild>
                <Icon className={style.deleteIcon}><MdDelete /></Icon>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content w='max-content'>
                        <Popover.Arrow />
                        <Popover.Body className={style.body}>
                            <Text className={style.question}>Delete <Span className={style.shelfName}>{shelf.name}</Span>?</Text>
                            <Flex className={style.buttons}>
                                <Button type='submit' 
                                    colorPalette='red' 
                                    variant='subtle'
                                    onClick={handleConfirm}
                                    className={style.confirm}>
                                  Confirm
                                </Button>
                                <Button type='reset' 
                                    colorPalette='green' 
                                    variant='outline'
                                    onClick={() => setOpen(false)}
                                    className={style.cancel}>
                                  Cancel
                                </Button>
                            </Flex>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default DeleteShelf;
