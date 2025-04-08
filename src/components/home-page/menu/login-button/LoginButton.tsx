import { Avatar, AvatarGroup, Flex } from '@chakra-ui/react';

const LoginButton = () => {

    return (
        <Flex>
            <AvatarGroup>
                <Avatar.Root>
                    <Avatar.Fallback name='Orbán Viktor' />
                    <Avatar.Image />
                </Avatar.Root>
            </AvatarGroup>
        </Flex>
    );
};

export default LoginButton;