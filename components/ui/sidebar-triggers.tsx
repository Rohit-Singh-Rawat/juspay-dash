'use client';

import { Button } from '@/components/ui/button';
import { SidebarTriggerIcon } from '@/components/icons/sidebar/sidebar-trigger';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useRightSidebar } from '@/contexts/sidebars-context';
import { cn } from '@/lib/utils';

export function LeftSidebarTrigger({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<SidebarTrigger
			className={cn('size-7 rounded-lg p-2', className)}
			{...props}
		/>
	);
}

export function RightSidebarTrigger({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggle } = useRightSidebar();

	return (
		<Button
			variant='ghost'
			size='icon'
			className={cn('size-7 rounded-lg p-2', className)}
			onClick={toggle}
			{...props}
		>
			<SidebarTriggerIcon className='size-5' />
			<span className='sr-only'>Toggle Right Sidebar</span>
		</Button>
	);
}

