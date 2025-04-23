import Menu from '@/components/menu/Menu';
import style from '../page.module.css';
import { isLoggedIn } from '@/utils/utils';
import { redirect } from 'next/navigation';
import Library from '@/components/library-page/library/Library';

export default async function LibraryPage() {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) redirect('/');

    return (
        <div className={style.page}>
            <header>
                <Menu/>
            </header>
            <main>
                <Library />
            </main>
        </div>
    );
}