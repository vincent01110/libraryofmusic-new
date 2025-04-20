import Menu from '@/components/menu/Menu';
import style from './page.module.css';
import Albums from '@/components/albums-page/albums/Albums';
import { isLoggedIn } from '@/utils/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) redirect('/');

    return (
        <div className={style.page}>
            <header>
                <Menu/>
            </header>
            <main>
                <Albums />
            </main>
        </div>
    );
}
