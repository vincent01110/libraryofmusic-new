import Menu from '@/components/home-page/menu/Menu';
import styles from './page.module.css';
import Carousel from '@/components/home-page/carousel/Carousel';
import { cookies } from 'next/headers';
import RandomAlbums from '@/components/home-page/random-albums/RandomAlbums';

export default async function Home() {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get('user_info');
    const user = userInfoCookie ? JSON.parse(userInfoCookie.value) : null;


    return (
        <div className={styles.page}>
            <header>
                <Menu />
            </header>
            <main className={styles.main}>
                <Carousel />
                {user && <RandomAlbums />}
            </main>
        </div>
    );
}
