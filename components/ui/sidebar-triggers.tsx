'use client';

import { Button } from '@/components/ui/button';
import { SidebarTriggerIcon } from '@/components/icons/sidebar/sidebar-trigger';
import { useSidebar } from '@/components/ui/sidebar';
import { useSidebars } from '@/contexts/sidebars-context';
import { cn } from '@/lib/utils';

export function LeftSidebarTrigger({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			variant='ghost'
			size='icon'
			className={cn('size-7 rounded-lg p-2', className)}
			onClick={toggleSidebar}
			{...props}
		>
			<SidebarTriggerIcon className='size-5' />
			<span className='sr-only'>Toggle Left Sidebar</span>
		</Button>
	);
}

export function RightSidebarTrigger({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleRightSidebar } = useSidebars();

	return (
		<Button
			variant='ghost'
			size='icon'
			className={cn('size-7 rounded-lg p-2', className)}
			onClick={toggleRightSidebar}
			{...props}
		>
			<SidebarTriggerIcon className='size-5' />
			<span className='sr-only'>Toggle Right Sidebar</span>
		</Button>
	);
}

