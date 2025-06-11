import Menu from '@/components/menu/Menu';
import style from '../page.module.css';
import { isLoggedIn } from '@/utils/utils';
import { redirect } from 'next/navigation';
import Library from '@/components/library-page/library/Library';
import CreateShelfDialog from '@/components/library-page/library/create-shelf/create-shelf-dialog/CreateShelfDialog';

export default async function LibraryPage() {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) redirect('/');

    return (
        <div className={style.page}>
            <header>
                <Menu/>
            </header>
            <main className={style.main}>
                <Library />
                <CreateShelfDialog />
            </main>
        </div>
    );
}