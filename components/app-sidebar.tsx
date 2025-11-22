'use client';

import * as React from 'react';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { DefaultIcon } from '@/components/icons/sidebar/default';
import { ECommerceIcon } from '@/components/icons/sidebar/eCommercce';
import { ProjectsIcon } from '@/components/icons/sidebar/projects';
import { OnlineCoursesIcon } from '@/components/icons/sidebar/online-courses';
import { UserProfileIcon } from '@/components/icons/sidebar/user-profile';

// Menu data structure matching your image
const menuData = {
	favorites: [
		{ title: 'Overview', url: '/dashboard/overview', icon: DefaultIcon },
		{ title: 'Projects', url: '/dashboard/projects', icon: ProjectsIcon },
	],
	dashboards: [
		{ title: 'Default', url: '/dashboard/default', icon: DefaultIcon },
		{ title: 'eCommerce', url: '/dashboard/ecommerce', icon: ECommerceIcon },
		{ title: 'Projects', url: '/dashboard/projects-dash', icon: ProjectsIcon },
		{ title: 'Online Courses', url: '/dashboard/online-courses', icon: OnlineCoursesIcon },
	],
	pages: {
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
		Account: { icon: UserProfileIcon, items: [] },
		Corporate: { icon: UserProfileIcon, items: [] },
		Blog: { icon: UserProfileIcon, items: [] },
		Social: { icon: UserProfileIcon, items: [] },
	},
};

export function AppSidebar() {
	const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
		'User Profile': true,
	});

	const toggleSection = (title: string) => {
		setOpenSections((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	return (
		<Sidebar
			className='border-r'
			collapsible='icon'
		>
			<SidebarHeader className='border-b px-4 py-3'>
				<div className='flex items-center gap-2'>
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background'>
						<span className='text-sm font-semibold'>B</span>
					</div>
					<span className='text-sm font-medium group-data-[collapsible=icon]:hidden'>ByeWind</span>
				</div>
			</SidebarHeader>

			<SidebarContent className='px-2 py-4'>
				{/* Favorites Section */}
				<SidebarGroup>
					<SidebarGroupLabel className='px-2 text-xs font-normal text-muted-foreground'>
						Favorites
					</SidebarGroupLabel>
					<SidebarMenu>
						{menuData.favorites.map((item) => {
							const Icon = item.icon;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className='text-sm font-normal'
										>
											<Icon className='mr-2' />
											{item.title}
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				{/* Recently Section */}
				<SidebarGroup className='mt-4'>
					<SidebarGroupLabel className='px-2 text-xs font-normal text-muted-foreground'>
						Recently
					</SidebarGroupLabel>
				</SidebarGroup>

				{/* Dashboards Section */}
				<SidebarGroup className='mt-4'>
					<SidebarGroupLabel className='px-2 text-xs font-normal text-muted-foreground'>
						Dashboards
					</SidebarGroupLabel>
					<SidebarMenu>
						{menuData.dashboards.map((item) => {
							const Icon = item.icon;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className='text-sm font-normal'
										>
											<Icon className='mr-2' />
											{item.title}
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				{/* Pages Section */}
				<SidebarGroup className='mt-4'>
					<SidebarGroupLabel className='px-2 text-xs font-normal text-muted-foreground'>
						Pages
					</SidebarGroupLabel>
					<SidebarMenu>
						{Object.entries(menuData.pages).map(([key, { icon, items }]) => {
							const Icon = icon;
							return (
								<Collapsible
									key={key}
									open={openSections[key]}
									onOpenChange={() => toggleSection(key)}
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton className='text-sm font-normal'>
												<ChevronRight
													className={`mr-1 h-4 w-4 transition-transform ${
														openSections[key] ? 'rotate-90' : ''
													}`}
												/>
												<Icon className='mr-2' />
												{key}
											</SidebarMenuButton>
										</CollapsibleTrigger>
										{items.length > 0 && (
											<CollapsibleContent>
												<SidebarMenuSub>
													{items.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<a
																	href={subItem.url}
																	className='text-sm font-normal'
																>
																	{subItem.title}
																</a>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										)}
									</SidebarMenuItem>
								</Collapsible>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
