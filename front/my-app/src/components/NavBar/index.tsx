import Link from 'next/link';
import styles from './index.module.css';
import CustomSearchBar from '../SearchBar';
import NavConfig, { NavItem } from '@/config/navConfig';

export default function NavBar(){
    return (
        <nav className={styles.header}>

            <ul className='flex flex-row items-center justify-center gap-5 w-full'>
                {NavConfig.map((el: NavItem) => {
                    return (
                        <li className='hover:text-white transition-all duration-200 ease-in-out font-light' key={`${el.text}-${el.path}`}>
                            <Link href={el.path}>
                                {el.text}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            {/* <div>
                <CustomSearchBar />
            </div> */}

        </nav>
    );
};

