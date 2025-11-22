'use client';

import { LeftSidebarTrigger, RightSidebarTrigger } from '@/components/ui/sidebar-triggers';
import { StarIcon } from '@/components/icons/star';
import { SunIcon } from '@/components/icons/sun';
import { ActivityIcon } from '@/components/icons/activity';
import { NotificationIcon } from '@/components/icons/notification';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useFavorites } from '@/contexts/favorites-context';
import { Separator } from '@/components/ui/separator';
import { CommandSearch } from '@/components/search/command-search';
import { dashboards, pages } from '@/config/navigation';

function Breadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	return (
		<div className='flex items-center'>
			{segments.map((segment, index) => {
				const isLast = index === segments.length - 1;
				const displayText =
					segment === 'dashboard' && index === 0
						? 'Dashboard'
						: segment.charAt(0).toUpperCase() + segment.slice(1);

				return (
					<div
						key={index}
						className='flex items-center gap-2 px-2 py-1'
					>
						<span className={isLast ? 'text-primary font-normal' : 'text-secondary'}>
							{displayText}
						</span>
						{!isLast && <span className='text-secondary pl-2'>/</span>}
					</div>
				);
			})}
		</div>
	);
}

function FavoriteButton() {
	const pathname = usePathname();
	const { toggleFavorite, isFavorite } = useFavorites();
	const isActive = isFavorite(pathname);

	const handleClick = () => {
		const segments = pathname.split('/').filter(Boolean);
		const title =
			segments[segments.length - 1]?.charAt(0).toUpperCase() +
				segments[segments.length - 1]?.slice(1) || 'Page';
		toggleFavorite({ title, url: pathname });
	};

	return (
		<Button
			variant='ghost'
			size='icon-sm'
			className='rounded-lg p-1'
			onClick={handleClick}
		>
			<StarIcon
				active={isActive}
				className='size-5'
			/>
		</Button>
	);
}

export function Header() {
	// Combine all navigation items for search
	const allNavigationItems = [
		...dashboards,
		...Object.entries(pages).flatMap(([sectionTitle, section]) =>
			section.items.map((item) => ({
				...item,
				icon: item.icon || section.icon,
			}))
		),
	];

	return (
		<header className='sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background'>
			<div className='flex flex-1 items-center gap-2 px-3'>
				<LeftSidebarTrigger />
				<Separator
					orientation='vertical'
					className='mr-2 h-4'
				/>
				<FavoriteButton />
				<Breadcrumb />
			</div>
			<div className='flex items-center gap-2 px-3'>
				<div className='w-64'>
					<CommandSearch navigationItems={allNavigationItems} />
				</div>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-lg'
				>
					<SunIcon className='size-5' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-lg'
				>
					<ActivityIcon className='size-5' />
				</Button>
				<Separator
					orientation='vertical'
					className='h-4'
				/>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-lg'
				>
					<NotificationIcon className='size-5' />
				</Button>
				<RightSidebarTrigger />
			</div>
		</header>
	);
}
