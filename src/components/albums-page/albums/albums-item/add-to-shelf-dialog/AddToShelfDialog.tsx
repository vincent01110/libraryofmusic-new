'use client';
import { Dialog, Portal, Image, Flex, Text, Select, createListCollection, Button } from '@chakra-ui/react';
import style from './AddToShelfDialog.module.scss';
import { API } from '@/interfaces/api';
import { getArtistsName } from '@/utils/client-utils';
import { useLibraryContext } from '@/contexts/LibraryContext';
import { useRef, useState } from 'react';

interface Prop {
    album: API.V1.Response.Spotify.Album;
    isAddToShelfOpen: boolean;
    toggleAdd: () => void;
}

const AddToShelfDialog = ({album, isAddToShelfOpen, toggleAdd}: Prop) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { shelves, addToShelf } = useLibraryContext();
    const shelvesCollection = createListCollection({
        items: shelves ? shelves.map(shelf => ({ label: shelf.name, value: shelf._id })) : []
    });
    const [selected, setSelected] = useState<string[]>([]);

    function handleSave() {
        const shelf = shelves?.find((s) => s._id === selected[0]);

        if (!shelf) return;

        addToShelf(shelf, album);
        setSelected([]);
        toggleAdd();
    }

    return (<Dialog.Root preventScroll={true} motionPreset='slide-in-top' placement='top' 
        open={isAddToShelfOpen}
        onOpenChange={toggleAdd}
        size='cover'>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content className={style.addContent} ref={contentRef}>
                    <Dialog.Body className={style.body}>
                        <Flex className={style.top}>
                            <Flex className={style.album}>
                                <Image className={style.cover} src={album.images[0].url} alt={album.name} />
                                <Flex flexDirection='column'>
                                    <h2 className={style.title}>
                                        {album.name}
                                    </h2>
                                    <Flex>
                                        <Text>{getArtistsName(album.artists)}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex className={style.selectContainer}>
                                {shelvesCollection ? 
                                    <Select.Root value={selected} 
                                        onValueChange={(e) => setSelected(e.value)} 
                                        size='lg' 
                                        collection={shelvesCollection}>
                                        <Select.HiddenSelect />
                                        <Select.Label>Select Shelf:</Select.Label>
                                        <Select.Control>
                                            <Select.Trigger style={{ paddingLeft: '10px' }}>
                                                <Select.ValueText placeholder='Select Shelf:' />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.ClearTrigger />
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>    
                                        </Select.Control>
                                        <Portal container={contentRef}>
                                            <Select.Positioner style={{ zIndex: 9999, position: 'absolute' }}>
                                                <Select.Content>
                                                    {shelvesCollection.items.map((shelf) => (
                                                        <Select.Item item={shelf} key={shelf.value}>
                                                            {shelf.label}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                    </Select.Root>
                                    :
                                    <div>No good</div>}
                            </Flex>
                        </Flex>
                        <Flex className={style.bottom}>
                            <Button disabled={selected.length == 0} onClick={handleSave} className={style.saveButton} variant='outline'>Save</Button>
                        </Flex>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>);
};
 
export default AddToShelfDialog;