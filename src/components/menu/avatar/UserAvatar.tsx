'use client';

import { useUserContext } from '@/contexts/UserContext';
import { AvatarGroup, Avatar, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from './UserAvatar.module.scss';

const UserAvatar = () => {
    const { user, loginStatus, logout } = useUserContext();
    const router = useRouter();

    function login() {
        if (loginStatus) logout();
        router.push('/api/proxy-login');
    }


    return (
        <Flex onClick={login}>
            {loginStatus ?
                <AvatarGroup cursor='pointer'>
                    <Avatar.Root>
                        <Avatar.Fallback name={user ? user.display_name : 'Orbán Viktor'} />
                        <Avatar.Image src={user && loginStatus ? user.images[1].url : undefined} />
                    </Avatar.Root>
                </AvatarGroup> 
                : 
                <Button variant='solid' className={style.loginButton}>
                    Log In <Image src='/spotify-icon.png' width={32} height={32} alt='Spotify' priority/>
                </Button>}
        </Flex>);
};

export default UserAvatar;