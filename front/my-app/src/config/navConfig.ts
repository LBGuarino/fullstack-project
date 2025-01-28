export interface NavItem {
    text: string;
    path: string;
    icon?: string
}

const NavConfig: NavItem[] = [
    {
        text: 'Support',
        path: '/support',
    },
    {
        text: 'About Us',
        path: '/about_us',
    },

];

export default NavConfig;