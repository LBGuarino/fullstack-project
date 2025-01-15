export interface NavItem {
    text: string;
    path: string;
}

const NavConfig: NavItem[] = [
    {
        text: 'Home',
        path: '/',
    },
    {
        text: 'Products',
        path: '/products',
    },
    {
        text: 'Support',
        path: '/support',
    },
    {
        text: 'About Us',
        path: '/about-us',
    },

];

export default NavConfig;