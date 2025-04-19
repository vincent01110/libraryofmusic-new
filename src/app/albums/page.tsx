import Menu from '@/components/menu/Menu';
import style from './page.module.css';

export default function Home() {
    return (
        <div className={style.page}>
            <header>
                <Menu/>
            </header>
            <h1>Albums</h1>
        </div>
    );
}
