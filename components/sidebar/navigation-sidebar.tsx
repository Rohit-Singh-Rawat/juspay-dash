'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/contexts/favorites-context';
import { useSidebars } from '@/contexts/sidebars-context';
import { dashboards, pages } from '@/config/navigation';

type TabType = 'favorites' | 'recently';

// Header Component
function NavigationHeader() {
	return (
		<SidebarHeader className='p-1 mb-2 px-4 '>
			<div className='flex items-center gap-2'>
				<Avatar className='h-6 w-6'>
					<AvatarImage
						src='/images/profile.png'
						alt='ByeWind'
					/>
					<AvatarFallback className='bg-foreground text-background text-sm font-semibold'>
						B
					</AvatarFallback>
				</Avatar>
				<span className='text-sm font-medium group-data-[collapsible=icon]:hidden'>ByeWind</span>
			</div>
		</SidebarHeader>
	);
}

function FavoritesRecentlySection({
	activeTab,
	onTabChange,
}: {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}) {
	const { getFavoritesWithIcons, getRecentWithIcons } = useFavorites();
	const items = activeTab === 'favorites' ? getFavoritesWithIcons() : getRecentWithIcons();

	return (
		<SidebarGroup className='p-1 gap-1'>
			<div className='flex gap-1'>
				<button
					type='button'
					onClick={() => onTabChange('favorites')}
					className={cn(
						'flex items-center hover:bg-[#f3f3f3] justify-center px-2 py-1 text-sm font-normal rounded-lg transition-colors',
						activeTab === 'favorites' ? 'text-secondary' : 'text-subtle hover:text-secondary'
					)}
				>
					Favorites
				</button>
				<button
					type='button'
					onClick={() => onTabChange('recently')}
					className={cn(
						'flex items-center justify-center hover:bg-[#f3f3f3] gap-2 px-2 py-1 text-sm font-normal rounded-lg transition-colors',
						activeTab === 'recently' ? 'text-secondary' : 'text-subtle hover:text-secondary'
					)}
				>
					Recently
				</button>
			</div>

			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.url}>
						<a
							href={item.url}
							className='flex items-center gap-2 px-2 py-1 text-sm font-normal'
						>
							<div className='size-4 flex items-center justify-center'>
								<span className='size-1.5 rounded-full bg-subtle' />
							</div>
							{item.title}
						</a>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

// Dashboards Section Component
function DashboardsSection() {
	const pathname = usePathname();
	const isActive = (url: string) => pathname === url;

	return (
		<SidebarGroup className='gap-1'>
			<SidebarGroupLabel className='px-2 text-sm font-normal text-secondary py-1'>
				Dashboards
			</SidebarGroupLabel>
			<SidebarMenu>
				{dashboards.map((item) => {
					const Icon = item.icon;
					const active = isActive(item.url);
					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								isActive={active}
								className='gap-1'
							>
								<a
									href={item.url}
									className='text-sm font-normal'
								>
									{Icon && <Icon className='ml-2' />}
									{item.title}
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

// Pages Section Component
function PagesSection({
	openSections,
	onToggleSection,
}: {
	openSections: Record<string, boolean>;
	onToggleSection: (title: string) => void;
}) {
	const pathname = usePathname();
	const isActive = (url: string) => pathname === url;

	return (
		<SidebarGroup className='gap-1'>
			<SidebarGroupLabel className='px-2 text-sm font-normal text-secondary py-1'>
				Pages
			</SidebarGroupLabel>
			<SidebarMenu>
				{Object.entries(pages).map(([key, { icon, items }]) => {
					const Icon = icon;
					return (
						<Collapsible
							key={key}
							open={openSections[key]}
							onOpenChange={() => onToggleSection(key)}
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton className='text-sm font-normal gap-1'>
										<ChevronRight
											className={cn(
												'h-4 w-4 transition-transform text-subtle shrink-0',
												openSections[key] && 'rotate-90'
											)}
										/>
										<Icon className='shrink-0' />
										<span className='truncate'>{key}</span>
									</SidebarMenuButton>
								</CollapsibleTrigger>
								{items.length > 0 && (
									<CollapsibleContent>
										<SidebarMenuSub className='border-none'>
											{items.map((subItem) => {
												const active = isActive(subItem.url);
												return (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={active}
														>
															<a
																href={subItem.url}
																className='text-sm font-normal ml-4'
															>
																{subItem.title}
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												);
											})}
										</SidebarMenuSub>
									</CollapsibleContent>
								)}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

// Main Navigation Sidebar Component
export function NavigationSidebar() {
	const [activeTab, setActiveTab] = React.useState<TabType>('favorites');
	const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
		'User Profile': false,
	});

	const toggleSection = (title: string) => {
		setOpenSections((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	return (
		<Sidebar
			side='left'
			className='border-r bg-white py-5'
			collapsible='offcanvas'
		>
			<NavigationHeader />

			<SidebarContent className='gap-4 px-4'>
				<FavoritesRecentlySection
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
				<DashboardsSection />
				<PagesSection
					openSections={openSections}
					onToggleSection={toggleSection}
				/>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
