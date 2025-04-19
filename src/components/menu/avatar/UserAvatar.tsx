'use client';

import { useUserContext } from '@/contexts/UserContext';
import { AvatarGroup, Avatar, Flex, Button, Popover, Portal, Separator, Stack, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from './UserAvatar.module.scss';
import { CiLogout } from 'react-icons/ci';
import { GoLinkExternal } from 'react-icons/go';


const UserAvatar = () => {
    const { user, loginStatus, logout, isLoading, setIsLoading } = useUserContext();
    const router = useRouter();

    function login() {
        if (loginStatus) logout();
        setIsLoading(true);
        router.push('/api/proxy-login');
    }


    return (
        <Flex>
            {loginStatus ?
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <AvatarGroup cursor='pointer'>
                            <Avatar.Root>
                                <Avatar.Fallback name={user ? user.display_name : 'U'} />
                                <Avatar.Image src={user && loginStatus ? user.images[1].url : undefined} />
                            </Avatar.Root>
                        </AvatarGroup> 
                    </Popover.Trigger>
                    <Portal>
                        <Popover.Positioner>
                            <Popover.Content width={125} className={style.popoverContainer}>
                                <Popover.Arrow />
                                <Popover.Body className={style.popoverBody}>
                                    <Stack>
                                        <Popover.Title>{user ? user.display_name : 'Profile:'}</Popover.Title>
                                        <Separator size='sm' variant='solid' />
                                        <a target='_blank' rel='noopener noreferrer' href={`https://open.spotify.com/user/${user?.id}`}>
                                            Spotify Profile 
                                            <Icon>
                                                <GoLinkExternal />
                                            </Icon>
                                        </a>
                                        <Separator size='sm' variant='solid' />
                                        <Button variant='ghost' onClick={login}>
                                            Log Out
                                            <Icon><CiLogout/></Icon>
                                        </Button>
                                    </Stack>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Portal>
                </Popover.Root>
                : 
                <Button variant='solid' className={style.loginButton} disabled={isLoading} onClick={login}>
                    Log In <Image src='/spotify-icon.png' width={32} height={32} alt='Spotify' priority/>
                </Button>}
        </Flex>);
};

export default UserAvatar;