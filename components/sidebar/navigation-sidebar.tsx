'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import type { ComponentType } from 'react';
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
import type { NavigationItem } from '@/config/navigation';
import { dashboards, dashboardLinks, pages } from '@/config/navigation';

type TabType = 'favorites' | 'recently';

function NavigationHeader() {
	return (
		<SidebarHeader className='p-1 mb-2 px-4 text-primary'>
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
						'flex items-center hover:bg-[#f3f3f3] dark:hover:bg-accent justify-center px-2 py-1 text-sm font-normal rounded-lg transition-colors',
						activeTab === 'favorites' ? 'text-secondary' : 'text-subtle hover:text-secondary'
					)}
				>
					Favorites
				</button>
				<button
					type='button'
					onClick={() => onTabChange('recently')}
					className={cn(
						'flex items-center justify-center hover:bg-[#f3f3f3] dark:hover:bg-accent gap-2 px-2 py-1 text-sm font-normal rounded-lg transition-colors',
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

interface CollapsibleSectionProps {
	title: string;
	icon: ComponentType<{ className?: string }>;
	items: NavigationItem[];
	isOpen: boolean;
	onToggle: () => void;
}

function CollapsibleSection({
	title,
	icon: Icon,
	items,
	isOpen,
	onToggle,
}: CollapsibleSectionProps) {
	const pathname = usePathname();
	const isActive = (url: string) => pathname === url;

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={onToggle}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className='text-sm font-normal gap-1'>
						<ChevronRight
							className={cn(
								'h-4 w-4 transition-transform text-subtle shrink-0',
								isOpen && 'rotate-90'
							)}
						/>
						<Icon className='shrink-0 size-5	' />
						<span className='truncate'>{title}</span>
					</SidebarMenuButton>
				</CollapsibleTrigger>
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
			</SidebarMenuItem>
		</Collapsible>
	);
}

function DashboardsSection({
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
				Dashboards
			</SidebarGroupLabel>
			<SidebarMenu>
				{dashboardLinks.map((item) => {
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
									{Icon && <Icon className=' size-5 ml-5' />}
									{item.title}
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
				{Object.entries(dashboards).map(([key, { icon, items }]) => (
					<CollapsibleSection
						key={key}
						title={key}
						icon={icon}
						items={items}
						isOpen={openSections[key] || false}
						onToggle={() => onToggleSection(key)}
					/>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

function PagesSection({
	openSections,
	onToggleSection,
}: {
	openSections: Record<string, boolean>;
	onToggleSection: (title: string) => void;
}) {
	return (
		<SidebarGroup className='gap-1'>
			<SidebarGroupLabel className='px-2 text-sm font-normal text-secondary py-1'>
				Pages
			</SidebarGroupLabel>
			<SidebarMenu>
				{Object.entries(pages).map(([key, { icon, items }]) => (
					<CollapsibleSection
						key={key}
						title={key}
						icon={icon}
						items={items}
						isOpen={openSections[key] || false}
						onToggle={() => onToggleSection(key)}
					/>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

export function NavigationSidebar() {
	const [activeTab, setActiveTab] = React.useState<TabType>('favorites');
	const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
		eCommerce: true,
		Projects: false,
		'Online Courses': false,
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
			className='border-r bg-sidebar py-5'
			collapsible='offcanvas'
		>
			<NavigationHeader />

			<SidebarContent className='gap-4 px-4'>
				<FavoritesRecentlySection
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
				<DashboardsSection
					openSections={openSections}
					onToggleSection={toggleSection}
				/>
				<PagesSection
					openSections={openSections}
					onToggleSection={toggleSection}
				/>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
