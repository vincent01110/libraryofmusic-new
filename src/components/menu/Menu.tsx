import { Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import style from './Menu.module.scss';
import UserAvatar from './avatar/UserAvatar';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

const Menu = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLoggedIn = await useIsLoggedIn();

    return (
        <HStack className={`${style.bar}  ${!isLoggedIn ? style.loggedIn : style.loggedOut}`} >
            <Flex className={style.container}>
                <Link className={style.link} href='/'>Home</Link>
                {isLoggedIn && 
                <>
                    <Link className={style.link} href='/library'>Library</Link>
                    <Link className={style.link} href=''>Albums</Link>
                </>
                }
            </Flex>
            <UserAvatar />
        </HStack>
    );
};

export default Menu;