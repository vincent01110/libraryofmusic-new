import styles from './page.module.css';
import Carousel from '@/components/home-page/carousel/Carousel';
import RandomAlbums from '@/components/home-page/random-albums/RandomAlbums';
import Description from '@/components/home-page/description/Description';
import { isLoggedIn } from '@/utils/utils';
import Menu from '@/components/menu/Menu';

export default async function Home() {
    const loggedIn = await isLoggedIn();


    return (
        <div className={styles.page}>
            <header>
                <Menu />
            </header>
            <main className={styles.main}>
                <Carousel />
                <Description />
                {loggedIn && <RandomAlbums />}
            </main>
        </div>
    );
}
