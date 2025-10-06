export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    paid?: string;
    event?: string;
}

export interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type DashboardConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};

type ComponentItem = {
    name: string;
    href: string;
    isNew?: boolean;
    isUpdated?: boolean;
};

type ComponentGroup = {
    name: string;
    items: ComponentItem[];
};
