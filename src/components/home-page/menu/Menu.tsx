import { Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import LoginButton from './login-button/LoginButton';
import style from './Menu.module.scss';

const Menu = () => {
    return (
        <HStack className={style.bar}>
            <Flex className={style.container}>
                <Link href=''>Home</Link>
                <Link href=''>Library</Link>
                <Link href=''>Albums</Link>
            </Flex>
            <LoginButton />
        </HStack>
    );
};

export default Menu;