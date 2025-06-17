import { API } from '@/interfaces/api';
import style from './EditShelf.module.scss';
import { Dialog, Portal } from '@chakra-ui/react';
import React from 'react';

interface Props {
    children: React.ReactNode;
    shelf: API.V1.Response.Shelves.Shelf;
}

const EditShelf = ({ children, shelf }: Props) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                { children }
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            { shelf.name }
                        </Dialog.Header>
                        <Dialog.Body>

                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>);
};

export default EditShelf;
