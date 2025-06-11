'use client';
import { Box, Button, CloseButton, Color, ColorPicker, 
    ColorPickerValueChangeDetails, Dialog, Field, 
    Flex, 
    HStack, Icon, Input, parseColor, Portal } from '@chakra-ui/react';
import style from './CreateShelfDialog.module.scss';
import { IoMdAdd } from 'react-icons/io';
import { ChangeEvent, useRef, useState } from 'react';
import { createShelf } from '@/utils/api';
import { API } from '@/interfaces/api';
import { useLibraryContext } from '@/contexts/LibraryContext';

const CreateShelfDialog = () => {
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [color, setColor] = useState<Color>(parseColor('#1ED760'));
    const contentRef = useRef(null);
    const { loadShelves } = useLibraryContext();
    const [open, setOpen] = useState<boolean>(false);

    function onNameChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 3 && !(e.target.value.length === 0)) {
            setNameError('Name length shorter than 3!');
        } else {
            setNameError('');
        }
        setName(e.target.value);
    }

    function onColorChange(e: ColorPickerValueChangeDetails) {
        setColor(parseColor(e.value.toString('hex')));
    }

    function onSave() {
        const shelf = {name, color: color.toString('hex')} as API.V1.Request.Shelf;
        createShelf(shelf).then((data) => {
            if (data) {
                setOpen(false);
                loadShelves();
            }
        });
    }

    return (
        <Dialog.Root placement='center' size='lg' open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button className={style.addButton} variant='surface' colorPalette='green'>
                    <Icon><IoMdAdd /></Icon>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content className={style.dialogContent} ref={contentRef}>
                        <Dialog.Header className={style.dialogHeader}>
                            <Dialog.Title>Create Shelf</Dialog.Title>
                            <Dialog.CloseTrigger>
                                <CloseButton size='xs' asChild />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body className={style.dialogBody}>
                            <Box className={style.dialogBox}>
                                <Field.Root invalid={nameError.length > 0}>
                                    <Field.Label>Name</Field.Label>
                                    <Input textIndent='10px' value={name} onChange={onNameChange} placeholder='' />
                                    <Field.ErrorText>{nameError}</Field.ErrorText>
                                </Field.Root>
                                <ColorPicker.Root w='full' value={color} defaultFormat='rgba' onValueChange={onColorChange} >
                                    <ColorPicker.HiddenInput />
                                    <ColorPicker.Label>Color</ColorPicker.Label>
                                    <ColorPicker.Control>
                                        <ColorPicker.Input textIndent='10px' />
                                        <ColorPicker.Trigger />
                                    </ColorPicker.Control>
                                    <Portal container={contentRef}>
                                        <ColorPicker.Positioner>
                                            <ColorPicker.Content>
                                                <ColorPicker.Area />
                                                <HStack>
                                                    <ColorPicker.Sliders />
                                                </HStack>
                                            </ColorPicker.Content>
                                        </ColorPicker.Positioner>
                                    </Portal>
                                </ColorPicker.Root>
                                <Flex>
                                    <Button variant='solid' colorPalette='white' onClick={onSave} className={style.saveButton}>
                                        Save    
                                    </Button>
                                </Flex>
                            </Box>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default CreateShelfDialog;
