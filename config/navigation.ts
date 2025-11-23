import { DefaultIcon } from '@/components/icons/sidebar/default';
import { ECommerceIcon } from '@/components/icons/sidebar/eCommercce';
import { ProjectsIcon } from '@/components/icons/sidebar/projects';
import { OnlineCoursesIcon } from '@/components/icons/sidebar/online-courses';
import { UserProfileIcon } from '@/components/icons/sidebar/user-profile';
import { AccountIcon } from '@/components/icons/sidebar/account';
import { CorporateIcon } from '@/components/icons/sidebar/corporate';
import { BlogIcon } from '@/components/icons/sidebar/blog';
import { SocialIcon } from '@/components/icons/sidebar/social';
import type { ComponentType } from 'react';

export interface NavigationItem {
	title: string;
	url: string;
	icon?: ComponentType<{ className?: string }>;
}

export interface DashboardSection {
	icon: ComponentType<{ className?: string }>;
	items: NavigationItem[];
}

export interface PageSection {
	icon: ComponentType<{ className?: string }>;
	items: NavigationItem[];
}

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
	'/dashboard/default': DefaultIcon,
	'/dashboard/ecommerce': ECommerceIcon,
	'/dashboard/ecommerce/orders': ECommerceIcon,
	'/pages/user-profile/projects': UserProfileIcon,
	'/pages/user-profile/campaigns': UserProfileIcon,
	'/pages/user-profile/documents': UserProfileIcon,
	'/pages/user-profile/followers': UserProfileIcon,
};

export const getIconForUrl = (url: string): ComponentType<{ className?: string }> | undefined => {
	return iconMap[url];
};

export const dashboards: Record<string, DashboardSection> = {
	eCommerce: {
		icon: ECommerceIcon,
		items: [
			{ title: 'Order List', url: '/dashboard/ecommerce/orders' },
		],
	},
	Projects: {
		icon: ProjectsIcon,
		items: [],
	},
	'Online Courses': {
		icon: OnlineCoursesIcon,
		items: [],
	},
};

export const dashboardLinks: NavigationItem[] = [
	{ title: 'Default', url: '/dashboard/default', icon: DefaultIcon },
];

export const pages: Record<string, PageSection> = {
	'User Profile': {
		icon: UserProfileIcon,
		items: [
			{ title: 'Overview', url: '/pages/user-profile/overview' },
			{ title: 'Projects', url: '/pages/user-profile/projects' },
			{ title: 'Campaigns', url: '/pages/user-profile/campaigns' },
			{ title: 'Documents', url: '/pages/user-profile/documents' },
			{ title: 'Followers', url: '/pages/user-profile/followers' },
		],
	},
	Account: { icon: AccountIcon, items: [] },
	Corporate: { icon: CorporateIcon, items: [] },
	Blog: { icon: BlogIcon, items: [] },
	Social: { icon: SocialIcon, items: [] },
};
