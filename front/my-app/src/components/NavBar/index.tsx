'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, BadgeProps, styled } from '@mui/material';
import styles from './index.module.css';
import NavConfig, { NavItem } from '@/config/navConfig';
import DropdownMenu, { DropdownMenuProps } from '../DropdownMenu';
import { useAuth } from '@/context/usersContext';
import { useCartContext } from '@/context/CartContext';
import { MenuIcon, XIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import MobileDropdown from '../MobileDropdown';
import AccountMenu from '../AccountMenu';

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
  const { user } = useAuth();
  const isLoggedIn = !!user?.id;
  const { productsInCart } = useCartContext();
  const totalItems = productsInCart.reduce((acc, item) => acc + item.quantity, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.header} relative`}>
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/hi-tec.png"
            alt="logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </Link>
      </div>

      <ul className="hidden md:flex flex-row items-center justify-center gap-5 mr-10">
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
          <li className="flex flex-row gap-2" key="login-icon">
            <Link href="/login">
              <img
                src="/user.svg"
                className="
                  w-5 h-5 
                  hover:transform 
                  hover:scale-125 
                  transition-all 
                  duration-200 
                  ease-in-out
                "
                alt="login"
              />
            </Link>
          </li>
        ) : (
          <div className="flex flex-row gap-4 items-center">
            <li key="shopping-bag-icon">
              <Link href="/shopping-bag">
                <StyledBadge badgeContent={totalItems} color="primary">
                  <ShoppingBagIcon
                    className="
                      w-6 h-6
                      hover:transform
                      hover:scale-125
                      transition-all
                      duration-200
                      ease-in-out
                    "
                  />
                </StyledBadge>
              </Link>
            </li>
            <AccountMenu />
          </div>
        )}

        <button 
          onClick={handleToggleMenu} 
          className="md:hidden p-2 text-gray-700 hover:bg-gray-200 rounded-md focus:outline-none transition"
        >
          {mobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </ul>

      {mobileMenuOpen && (
        <div 
          className="
            absolute top-20 right-0 
            w-full 
            bg-white 
            border-t 
            border-gray-300 
            shadow-md
            md:hidden
            animate-fadeIn
            z-50
          "
        >
          <div className="flex flex-col px-4 py-4 gap-4">
            <MobileDropdown 
              categories={dropdownProps.categories}
              popularProducts={dropdownProps.popularProducts}
              closeMobileMenu={closeMobileMenu}
            />

            {NavConfig.map((el: NavItem) => (
              <Link 
                key={`${el.text}-${el.path}`}
                href={el.path}
                className="text-sm text-gray-700 py-2 px-2 border-b hover:bg-gray-100"
              >
                {el.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
