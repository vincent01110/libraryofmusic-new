'use client';

import { useUserContext } from '@/contexts/UserContext';
import { AvatarGroup, Avatar, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const UserAvatar = () => {
    const { user, loginStatus, logout } = useUserContext();
    const router = useRouter();

    function login() {
        if (loginStatus) logout();
        router.push('/api/proxy-login');
    }

    return (
        <Flex onClick={login}>
            <AvatarGroup>
                <Avatar.Root>
                    <Avatar.Fallback name={user ? user.display_name : 'Orbán Viktor'} />
                    <Avatar.Image src={user && loginStatus ? user.images[1].url : undefined} />
                </Avatar.Root>
            </AvatarGroup>
        </Flex>);
};

export default UserAvatar;