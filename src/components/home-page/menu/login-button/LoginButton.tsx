'use client';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarGroup, Flex } from '@chakra-ui/react';
import style from './LoginButton.module.scss';

const LoginButton = () => {
    const { user, loginStatus } = useUser();

    function login() {
        window.location.href = '/api/proxy-login';
    }

    return (
        <Flex onClick={login} className={style.button}>
            <AvatarGroup>
                <Avatar.Root>
                    <Avatar.Fallback name={ loginStatus ?  user?.display_name : 'Orbán Viktor'} />
                    <Avatar.Image src={ loginStatus ? user?.images[1].url : undefined}/>
                </Avatar.Root>
            </AvatarGroup>
        </Flex>
    );
};

export default LoginButton;