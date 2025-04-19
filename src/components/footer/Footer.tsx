import { Flex } from '@chakra-ui/react';
import style from './Footer.module.scss';

const Footer = () => {
    return <Flex className={style.footer}>
        <ul>
            <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/vincent01110'>My GitHub</a></li>
            <li><a target='_blank' rel='noopener noreferrer' href='https://open.spotify.com/user/bencekristof06'>Spotify</a></li>
        </ul>
    </Flex>;
};
 
export default Footer;