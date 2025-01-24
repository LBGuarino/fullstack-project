'use client';
import Link from 'next/link';
import styles from './index.module.css';
import NavConfig, { NavItem } from '@/config/navConfig';
import DropdownMenu, { DropdownMenuProps } from '../DropdownMenu';
import { useAuth } from '@/context/usersContext';
import { Badge, BadgeProps, styled } from '@mui/material';
import { useCartContext } from '@/context/CartContext';

interface NavBarProps {
  dropdownProps: DropdownMenuProps;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 14,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  },
}));

export default function NavBar({ dropdownProps }: NavBarProps) {
  const { user, logout } = useAuth();
  const isLoggedIn = user?.id;
  const { productsInCart } = useCartContext();
  const totalItems = productsInCart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
  }

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
      {!isLoggedIn ? (
          <li 
            className="flex flex-row gap-2" 
            key="login-icon"
          >
            <Link href="/login">
              <img 
                src="/user.svg" 
                className="w-5 h-5 hover:transform hover:scale-125 transition-all duration-200 ease-in-out"
                alt="login"
              />
            </Link>
          </li>
        ) : (
          <>
          <li 
            className="flex flex-row gap-2" 
            key="shopping-bag-icon"
          >
            <Link href="/shopping-bag">
              <StyledBadge badgeContent={totalItems} color="primary">
              <img 
                src="/shopbag.svg" 
                className="w-5 h-5 hover:transform hover:scale-125 transition-all duration-200 ease-in-out"
                alt="shopping bag"
              />
              </StyledBadge>
            </Link>
          </li>
          <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </ul>
    </nav>
  );
}
