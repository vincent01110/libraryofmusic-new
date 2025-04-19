import { Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import style from './Menu.module.scss';
import UserAvatar from './avatar/UserAvatar';
import { isLoggedIn } from '@/utils/utils';

const Menu = async () => {
    const loggedIn = await isLoggedIn();

    return (
        <HStack className={`${style.bar}  ${!loggedIn ? style.loggedIn : style.loggedOut}`} >
            <Flex className={style.container}>
                <Link className={style.link} href='/'>Home</Link>
                {loggedIn && 
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