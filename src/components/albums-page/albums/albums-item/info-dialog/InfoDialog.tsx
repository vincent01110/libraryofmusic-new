import { Dialog, Flex, Portal, Text, Image } from '@chakra-ui/react';
import style from './InfoDialog.module.scss';
import { API } from '@/interfaces/api';
import { getArtistsName } from '@/utils/client-utils';

interface Prop {
    album: API.V1.Response.Spotify.Album;
    isInfoOpen: boolean;
    toggleInfo: () => void;
}

const InfoDialog = ({album, isInfoOpen, toggleInfo}: Prop) => {

    return (<Dialog.Root preventScroll={true} motionPreset='slide-in-bottom' placement='bottom' 
        size='cover' open={isInfoOpen}
        onOpenChange={toggleInfo}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner className={style.infoContainer}>
                <Dialog.Content className={style.infoContent}>
                    <Dialog.Header className={style.header}>
                        <Image className={style.cover} src={album.images[0].url} alt={album.name} />
                        <Flex flexDirection='column'>
                            <Dialog.Title className={style.title}>
                                {album.name}
                            </Dialog.Title>
                            <Flex>
                                <Text>{getArtistsName(album.artists)}</Text>
                            </Flex>
                        </Flex>
                    </Dialog.Header>
                    <Dialog.Body className={style.body}>
                        <Flex className={style.trackContainer}>
                            <table className={style.tracksTable}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {album.tracks.items.map((t, i) => (
                                        <tr key={t.id}>
                                            <td className={style.indexes}>{i+1}</td>
                                            <td className={style.dashes}>-</td>
                                            <td className={style.tracks}>{t.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Flex>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>);
};
 
export default InfoDialog;