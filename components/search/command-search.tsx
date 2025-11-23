'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@/components/icons/search';

interface CommandSearchProps {
	navigationItems?: Array<{
		title: string;
		url: string;
		icon?: React.ComponentType<any>;
	}>;
}

export function CommandSearch({ navigationItems = [] }: CommandSearchProps) {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const handleSelect = (url: string) => {
		setOpen(false);
		router.push(url);
	};

	return (
		<>
			<button
				className='relative px-2 py-1  w-full text-subtle flex items-center justify-start rounded-lg bg-sidebar-accent  text-sm  hover:bg-sidebar-accent/90 transition-colors  shadow-sm'
				onClick={() => setOpen(true)}
			>
				<SearchIcon className='mr-2 size-4 ' />
				<span className=''>Search</span>
				<kbd className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded  px-1 font-medium'>
					<span className=''>⌘</span>/
				</kbd>
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Type to search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{navigationItems.length > 0 && (
						<CommandGroup heading='Navigation'>
							{navigationItems.map((item) => (
								<CommandItem
									key={item.url}
									onSelect={() => handleSelect(item.url)}
								>
									{item.icon && <item.icon className='mr-2 size-4' />}
									<span>{item.title}</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}

