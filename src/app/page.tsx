import Menu from '@/components/home-page/menu/Menu';
import styles from './page.module.css';
import Carousel from '@/components/home-page/carousel/Carousel';

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <Menu />
            </header>
            <main className={styles.main}>
                <Carousel />
            </main>
        </div>
    );
}
