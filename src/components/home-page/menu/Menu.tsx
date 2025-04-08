import { Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import LoginButton from './login-button/LoginButton';

const Menu = () => {
    return (
        <HStack>
            <Flex>
                <HStack>
                    <Link href=''>Home</Link>
                    <Link href=''>Library</Link>
                    <Link href=''>Albums</Link>
                </HStack>
            </Flex>
            <LoginButton />
        </HStack>
    );
};

export default Menu;