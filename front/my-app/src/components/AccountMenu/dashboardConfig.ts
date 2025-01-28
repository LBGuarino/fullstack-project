export interface DashboardConfig {
    id: number;
    name: string;
    subTitles?: SubTitles[];
    path?: string;
}

export interface SubTitles {
    id: number;
    name: string;
    path: string;
}

export const dashboardConfig: DashboardConfig[] = [
    {
        id: 1,
        name: "My Orders",
        path: "/my-orders"
    },
    {
        id: 2,
        name: "My Profile",
        subTitles: [
            {
                id: 1,
                name: "Addresses",
                path: "/my_profile/addresses"
            },
            {
                id: 2,
                name: "Profile Settings",
                path: "/my_profile/settings"
            }
        ]
    },
    {
        id: 3,
        name: "My Wishlist",
        path: "/my-wishlist"
    }
];
