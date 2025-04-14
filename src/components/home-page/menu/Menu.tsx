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
        <HStack className={style.bar}>
            <Flex className={style.container}>
                <Link href='/'>Home</Link>
                {isLoggedIn && 
                <>
                    <Link href='/library'>Library</Link>
                    <Link href=''>Albums</Link>
                </>
                }
            </Flex>
            <Flex className={style.button}>
                <UserAvatar />
            </Flex>
        </HStack>
    );
};

export default Menu;