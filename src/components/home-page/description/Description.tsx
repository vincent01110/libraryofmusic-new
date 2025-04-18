import { Flex, Text } from '@chakra-ui/react';
import style from './Description.module.scss';

const Description = () => {
    return <Flex className={style.container}>
        <h1 className={style.title}>
            Discover & Organize Your Music Collection
        </h1>
        <Text className={style.desc}>
            Connect with Spotify and unlock a new way to enjoy your saved albums. Our app lets you browse your entire collection and group albums 
            into personalized shelves—just like organizing records on a shelf, but smarter. Whether you’re building a shelf for weekend vibes, nostalgic 
            throwbacks, or your favorite genres, it’s your collection, your way. Rediscover your music library and bring order (and a little joy) to your digital crates.
        </Text>
    </Flex>;
};
 
export default Description;