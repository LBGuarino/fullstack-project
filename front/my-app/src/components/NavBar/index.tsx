import Link from 'next/link';
import styles from './index.module.css';
import NavConfig, { NavItem } from '@/config/navConfig';
import DropdownMenu, { DropdownMenuProps } from '../DropdownMenu';
import { NavConfigUser } from '@/config/navConfigUser';

interface NavBarProps {
  dropdownProps: DropdownMenuProps;
}

export default function NavBar({ dropdownProps }: NavBarProps) {
  return (
    <nav className={styles.header}>
      <div className="flex items-center">
        <Link href="/">
            <img
            src="/hi-tec.png"
            alt="logo"
            className="w-28 h-28"
            />
        </Link>
      </div>

      <ul className="flex flex-row items-center justify-center gap-5 mr-10">
        <DropdownMenu 
          categories={dropdownProps.categories} 
          popularProducts={dropdownProps.popularProducts} 
        />

        {NavConfig.map((el: NavItem) => (
          <li
            className="hover:text-white transition-all duration-200 ease-in-out font-light"
            key={`${el.text}-${el.path}`}
          >
            <Link href={el.path}>{el.text}</Link>
          </li>
        ))}
      </ul>

      <ul className="flex flex-row items-center justify-end gap-4">
        {NavConfigUser.map((el: NavItem) => (
          <li 
            className="flex flex-row gap-2" 
            key={`${el.text}-${el.path}`}
          >
            <Link href={el.path}>
              <img 
                src={el.icon} 
                className="w-5 h-5 hover:transform hover:scale-125 transition-all duration-200 ease-in-out"
                alt={el.text} 
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
