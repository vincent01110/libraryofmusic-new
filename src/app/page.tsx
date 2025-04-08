import Menu from '@/components/home-page/menu/Menu';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <Menu />
            </header>
            <main className={styles.main}>
               
            </main>
        </div>
    );
}
