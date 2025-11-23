'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BugIcon } from '@/components/icons/activity/bug';
import { UserIcon } from '@/components/icons/activity/user';
import { RadioIcon } from '@/components/icons/activity/radio';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useRightSidebar } from '@/contexts/sidebars-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';

const notifications = [
	{
		id: 1,
		icon: BugIcon,
		title: 'You have a bug that needs...',
		time: 'Just now',
		type: 'bug',
	},
	{
		id: 2,
		icon: UserIcon,
		title: 'New user registered',
		time: '59 minutes ago',
		type: 'user',
	},
	{
		id: 3,
		icon: BugIcon,
		title: 'You have a bug that needs...',
		time: '12 hours ago',
		type: 'bug',
	},
	{
		id: 4,
		icon: RadioIcon,
		title: 'Andi Lane subscribed to you',
		time: 'Today, 11:59 AM',
		type: 'subscription',
	},
];

const activities = [
	{
		id: 1,
		user: 'You',
		avatar: '/images/activity/user1.png',
		action: 'You have a bug that needs...',
		time: 'Just now',
	},
	{
		id: 2,
		user: 'Admin',
		avatar: '/images/activity/user2.png',
		action: 'Released a new version',
		time: '59 minutes ago',
	},
	{
		id: 3,
		user: 'User',
		avatar: '/images/activity/user3.png',
		action: 'Submitted a bug',
		time: '12 hours ago',
	},
	{
		id: 4,
		user: 'Dev',
		avatar: '/images/activity/user4.png',
		action: 'Modified A data in Page X',
		time: 'Today, 11:59 AM',
	},
	{
		id: 5,
		user: 'Manager',
		avatar: '/images/activity/user5.png',
		action: 'Deleted a page in Project X',
		time: 'Feb 2, 2023',
	},
];

const contacts = [
	{ id: 1, name: 'Natali Craig', avatar: '/images/activity/natali.png', color: 'bg-slate-400' },
	{ id: 2, name: 'Drew Cano', avatar: '/images/activity/DrewCano.png', color: 'bg-red-500' },
	{ id: 3, name: 'Orlando Diggs', avatar: '/images/activity/orlando.png', color: 'bg-amber-400' },
	{ id: 4, name: 'Andi Lane', avatar: '/images/activity/andi.png', color: 'bg-stone-300' },
	{ id: 5, name: 'Kate Morrison', avatar: '/images/activity/kate.png', color: 'bg-rose-300' },
	{ id: 6, name: 'Koray Okumus', avatar: '/images/activity/koray.png', color: 'bg-cyan-400' },
];

function SectionHeader({ title }: { title: string }) {
	return (
		<div className='flex items-center justify-between px-2 py-1'>
			<h3 className='text-sm font-semibold text-foreground'>{title}</h3>
		</div>
	);
}

function NotificationItem({
	icon: Icon,
	title,
	time,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	time: string;
}) {
	return (
		<div className='flex items-start gap-2 p-1'>
			<div className='size-6 rounded-lg bg-[#E3F5FF]  flex items-center justify-center shrink-0'>
				<Icon className='w-4 h-4 text-[#1C1C1C] ' />
			</div>
			<div className='flex-1 min-w-0'>
				<p className='text-sm text-foreground truncate'>{title}</p>
				<p className='text-xs font-normal text-secondary'>{time}</p>
			</div>
		</div>
	);
}

function NotificationsSection() {
	return (
		<div className='space-y-2'>
			<SectionHeader title='Notifications' />
			<div className='flex flex-col gap-2'>
				{notifications.map((notification) => (
					<NotificationItem
						key={notification.id}
						icon={notification.icon}
						title={notification.title}
						time={notification.time}
					/>
				))}
			</div>
		</div>
	);
}

function ActivityItem({
	user,
	avatar,
	action,
	time,
	isLast,
}: {
	user: string;
	avatar: string;
	action: string;
	time: string;
	isLast: boolean;
}) {
	return (
		<div className='flex items-start gap-2 p-1'>
			<div
				className={cn(
					'relative flex flex-col items-center',
					!isLast &&
						'after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-px after:h-[14px] after:bg-border after:content-[""]'
				)}
			>
				<Avatar className='size-6 shrink-0'>
					<AvatarImage src={avatar} />
					<AvatarFallback className='text-xs'>
						{user
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className='flex-1 min-w-0'>
				<p className='text-sm text-foreground truncate'>{action}</p>
				<p className='text-xs font-normal text-secondary'>{time}</p>
			</div>
		</div>
	);
}

function ActivitiesSection() {
	return (
		<div className='space-y-2'>
			<SectionHeader title='Activities' />
			<div className='flex flex-col gap-2'>
				{activities.map((activity, index) => (
					<ActivityItem
						key={activity.id}
						user={activity.user}
						avatar={activity.avatar}
						action={activity.action}
						time={activity.time}
						isLast={index === activities.length - 1}
					/>
				))}
			</div>
		</div>
	);
}

function ContactItem({ name, avatar, color }: { name: string; avatar: string; color: string }) {
	return (
		<div className='flex items-start gap-2 p-1'>
			<Avatar className='size-6 shrink-0'>
				<AvatarImage src={avatar} />
				<AvatarFallback className={cn('text-xs text-white', color)}>
					{name
						.split(' ')
						.map((n) => n[0])
						.join('')}
				</AvatarFallback>
			</Avatar>
			<div className='flex-1 min-w-0'>
				<p className='text-sm text-foreground truncate'>{name}</p>
			</div>
		</div>
	);
}

function ContactsSection() {
	return (
		<div className='space-y-2'>
			<SectionHeader title='Contacts' />
			<div className='flex flex-col gap-2'>
				{contacts.map((contact) => (
					<ContactItem
						key={contact.id}
						name={contact.name}
						avatar={contact.avatar}
						color={contact.color}
					/>
				))}
			</div>
		</div>
	);
}

function ActivitySidebarContent() {
	return (
		<div className='flex flex-col gap-6 p-5 h-full'>
			<NotificationsSection />
			<ActivitiesSection />
			<ContactsSection />
		</div>
	);
}

function ActivitySidebar() {
	const { open, setOpen } = useRightSidebar();
	const isMobile = useIsMobile();
	useEffect(() => {
		if (isMobile) {
			setOpen(false);
		}
	}, [isMobile, setOpen]);

	if (isMobile) {
		return (
			<Sheet
				open={open}
				onOpenChange={setOpen}
			>
				<SheetContent
					side='right'
					className='w-[280px] sm:max-w-[280px] p-0 overflow-y-auto'
				>
					<ActivitySidebarContent />
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<aside
			className={cn(
				'relative h-full bg-background border-l border-border',
				'transition-all duration-200 delay-100 ease-in-out',
				'overflow-y-auto overflow-x-hidden',
				'hidden lg:block',
				open ? 'w-[280px] translate-x-0' : 'w-0 translate-x-full opacity-0 pointer-events-none'
			)}
		>
			<ActivitySidebarContent />
		</aside>
	);
}

export { ActivitySidebar };
