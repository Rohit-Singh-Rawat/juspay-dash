'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, CopyIcon, ArchiveIcon, Share2Icon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types/order';

const getStatusColor = (status: OrderStatus) => {
	const colors: Record<OrderStatus, string> = {
		'In Progress': '#8A8CD9',
		Complete: '#4AA785',
		Pending: '#59A8D4',
		Approved: '#FFC555',
		Rejected: '#1C1C1C66',
	};
	return colors[status] || '#1C1C1C66';
};

export function createOrderColumns(): ColumnDef<Order>[] {
	return [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			),
			size: 40,
			enableSorting: false,
			enableHiding: false,
		},
		{
			header: 'Order ID',
			accessorKey: 'id',
			cell: ({ row }) => <div className='font-medium text-foreground'>{row.getValue('id')}</div>,
			size: 100,
			enableHiding: false,
		},
		{
			header: 'User',
			accessorKey: 'user',
			cell: ({ row }) => {
				const user = row.original.user;
				return (
					<div className='flex items-center gap-3'>
						<Avatar className='h-8 w-8'>
							<AvatarImage
								src={user.avatar}
								alt={user.name}
							/>
							<AvatarFallback className='text-xs'>
								{user.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<span className='font-medium'>{user.name}</span>
					</div>
				);
			},
			size: 200,
		},
		{
			header: 'Project',
			accessorKey: 'project',
			size: 180,
		},
		{
			header: 'Address',
			accessorKey: 'address',
			size: 200,
		},
		{
			header: 'Date',
			accessorKey: 'date',
			cell: ({ row }) => (
				<div className='flex items-center gap-2'>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M13 2H11.5V1.5C11.5 1.36739 11.4473 1.24021 11.3536 1.14645C11.2598 1.05268 11.1326 1 11 1C10.8674 1 10.7402 1.05268 10.6464 1.14645C10.5527 1.24021 10.5 1.36739 10.5 1.5V2H5.5V1.5C5.5 1.36739 5.44732 1.24021 5.35355 1.14645C5.25979 1.05268 5.13261 1 5 1C4.86739 1 4.74021 1.05268 4.64645 1.14645C4.55268 1.24021 4.5 1.36739 4.5 1.5V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM4.5 3V3.5C4.5 3.63261 4.55268 3.75979 4.64645 3.85355C4.74021 3.94732 4.86739 4 5 4C5.13261 4 5.25979 3.94732 5.35355 3.85355C5.44732 3.75979 5.5 3.63261 5.5 3.5V3H10.5V3.5C10.5 3.63261 10.5527 3.75979 10.6464 3.85355C10.7402 3.94732 10.8674 4 11 4C11.1326 4 11.2598 3.94732 11.3536 3.85355C11.4473 3.75979 11.5 3.63261 11.5 3.5V3H13V5H3V3H4.5ZM13 13H3V6H13V13Z'
							fill='currentColor'
						/>
					</svg>

					<span>{row.getValue('date')}</span>
				</div>
			),
			size: 140,
		},
		{
			header: 'Status',
			accessorKey: 'status',
			cell: ({ row }) => {
				const status = row.getValue('status') as OrderStatus;
				const color = getStatusColor(status);
				return (
					<div className='flex items-center gap-2'>
						<span
							className='size-[6px] rounded-full'
							style={{ backgroundColor: color }}
						/>
						<span style={{ color }}>{status}</span>
					</div>
				);
			},
			size: 130,
		},
		{
			id: 'actions',
			header: () => <span className='sr-only'>Actions</span>,
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='flex justify-end'>
							<Button
								size='icon'
								variant='ghost'
								className='h-8 w-8 shadow-none'
								aria-label='Open menu'
							>
								<EllipsisIcon
									className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity'
									strokeWidth={1}
									fill='currentColor'
									aria-hidden='true'
								/>
							</Button>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='w-48'
					>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<CopyIcon className='h-4 w-4' />
								<span>Duplicate</span>
								<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ArchiveIcon className='h-4 w-4' />
								<span>Archive</span>
								<DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Share2Icon className='h-4 w-4' />
								<span>Share</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='text-destructive focus:text-destructive'>
							<TrashIcon className='h-4 w-4' />
							<span>Delete</span>
							<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
			size: 60,
			enableHiding: false,
		},
	];
}
