'use client';

import { useId, useMemo, useRef, useState } from 'react';
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import {
	PlusIcon,
	ArrowUpDownIcon,
	SearchIcon,
	CircleXIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from 'lucide-react';
import { FilterIcon } from '@/components/icons/filter';

import { cn } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createOrderColumns } from './order-table-columns';
import type { Order, OrderStatus } from '@/types/order';
import { RightChevronIcon, LeftChevronIcon } from '../icons/rightChevron';

interface OrderListProps {
	data: Order[];
}

interface StatusFilterProps {
	uniqueValues: string[];
	selectedValues: string[];
	counts: Map<string, number>;
	onStatusChange: (checked: boolean, value: string) => void;
	id: string;
}

interface AddOrderDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

function StatusFilter({
	uniqueValues,
	selectedValues,
	counts,
	onStatusChange,
	id,
}: StatusFilterProps) {
	return (
		<Tooltip>
			<Popover>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<Button
							size='icon'
							variant='ghost'
							className='h-8 w-8'
							aria-label='Filter'
						>
							<FilterIcon
								className='size-5'
								aria-hidden='true'
							/>
						</Button>
					</PopoverTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Filter by status</p>
				</TooltipContent>
				<PopoverContent
					className='w-auto min-w-36 p-3'
					align='start'
				>
					<div className='space-y-3'>
						<div className='text-xs font-medium text-muted-foreground'>Filter by Status</div>
						<div className='space-y-3'>
							{uniqueValues.map((value, i) => (
								<div
									key={value}
									className='flex items-center gap-2'
								>
									<Checkbox
										id={`${id}-${i}`}
										checked={selectedValues.includes(value)}
										onCheckedChange={(checked: boolean) => onStatusChange(checked, value)}
									/>
									<Label
										htmlFor={`${id}-${i}`}
										className='flex grow justify-between gap-2 font-normal cursor-pointer'
									>
										{value}
										<span className='text-xs text-muted-foreground'>{counts.get(value)}</span>
									</Label>
								</div>
							))}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</Tooltip>
	);
}

interface FormInputProps {
	id: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	required?: boolean;
}

function FormInput({ id, value, onChange, placeholder, required = false }: FormInputProps) {
	return (
		<Input
			id={id}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className='border-black/5 placeholder:text-subtle rounded-2xl p-4 h-12 focus:bg-muted'
			required={required}
		/>
	);
}

function AddOrderDialog({ open, onOpenChange, onAddOrder }: AddOrderDialogProps) {
	const [formData, setFormData] = useState({
		user: '',
		project: '',
		address: '',
		status: 'Pending' as OrderStatus,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.user && formData.project && formData.address) {
			onAddOrder({
				user: {
					name: formData.user,
					avatar: '/images/activity/user1.png',
				},
				project: formData.project,
				address: formData.address,
				status: formData.status,
			});
			setFormData({
				user: '',
				project: '',
				address: '',
				status: 'Pending' as OrderStatus,
			});
			onOpenChange(false);
		}
	};

	const statusOptions = [
		{ value: 'Pending', label: 'Pending' },
		{ value: 'In Progress', label: 'In Progress' },
		{ value: 'Complete', label: 'Complete' },
		{ value: 'Approved', label: 'Approved' },
		{ value: 'Rejected', label: 'Rejected' },
	];

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='rounded-4xl p-10 md:max-w-md'>
				<DialogHeader className='space-y-3'>
					<DialogTitle className='text-2xl font-normal bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
						Add New Order
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-5'
				>
					<FormInput
						id='user'
						value={formData.user}
						onChange={(value) => setFormData({ ...formData, user: value })}
						placeholder='Enter user name'
						required
					/>
					<FormInput
						id='address'
						value={formData.address}
						onChange={(value) => setFormData({ ...formData, address: value })}
						placeholder='Enter address'
						required
					/>
					<div className='flex gap-2'>
						<FormInput
							id='project'
							value={formData.project}
							onChange={(value) => setFormData({ ...formData, project: value })}
							placeholder='Enter project name'
							required
						/>
						<Select
							value={formData.status}
							onValueChange={(value: OrderStatus) => setFormData({ ...formData, status: value })}
						>
							<SelectTrigger
								id='status'
								className='border-black/5 data-placeholder:text-subtle rounded-2xl p-4 h-12 flex-1 data-[size=default]:h-12 data-[size=sm]:h-12'
							>
								<SelectValue
									placeholder='Select status'
									className='text-subtle'
								/>
							</SelectTrigger>
							<SelectContent className='rounded-2xl'>
								{statusOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										className='focus:bg-muted rounded-xl'
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='flex justify-center gap-3 pt-2'>
						<Button
							type='button'
							variant='ghost'
							onClick={() => onOpenChange(false)}
							className='bg-muted p-4 h-12 rounded-2xl flex-1'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='default'
							className='bg-primary text-primary-foreground hover:bg-primary/90 p-4 h-12 rounded-2xl flex-1'
						>
							Add Order
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function OrderList({ data: initialData }: OrderListProps) {
	const id = useId();
	const [data, setData] = useState<Order[]>(initialData);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const columns = useMemo(() => createOrderColumns(), []);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			pagination,
			columnFilters,
			columnVisibility,
		},
	});

	const uniqueStatusValues = useMemo(() => {
		const statusColumn = table.getColumn('status');
		if (!statusColumn) return [];
		return Array.from(statusColumn.getFacetedUniqueValues().keys()).sort();
	}, [table.getColumn('status')?.getFacetedUniqueValues()]);

	const statusCounts = useMemo(() => {
		const statusColumn = table.getColumn('status');
		if (!statusColumn) return new Map();
		return statusColumn.getFacetedUniqueValues();
	}, [table.getColumn('status')?.getFacetedUniqueValues()]);

	const selectedStatuses = useMemo(() => {
		const filterValue = table.getColumn('status')?.getFilterValue() as string[];
		return filterValue ?? [];
	}, [table.getColumn('status')?.getFilterValue()]);

	const searchValue = (table.getColumn('id')?.getFilterValue() ?? '') as string;

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = table.getColumn('status')?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		table.getColumn('status')?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
	};

	const handleAddOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
		const newOrder: Order = {
			id: `#CM${9800 + data.length + 1}`,
			...orderData,
			date: 'Just now',
		};
		setData([newOrder, ...data]);
	};

	const handleAddClick = () => {
		setIsAddDialogOpen(true);
		// Close any open popovers by triggering a click outside
		document.body.click();
	};

	const handleReorder = () => {
		const reversedData = [...data].reverse();
		setData(reversedData);
		// Reset to first page after reordering
		table.setPageIndex(0);
	};

	const currentPage = table.getState().pagination.pageIndex;
	const totalPages = table.getPageCount();

	return (
		<TooltipProvider>
			<div className='space-y-4'>
				{/* Table Header Controls */}
				<div className='flex items-center justify-between gap-4 bg-[#F7F9FB] rounded-lg p-2'>
					<div className='flex items-center gap-3'>
						{/* Add Order Button with Tooltip */}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size='icon'
									variant='ghost'
									className='h-8 w-8'
									onClick={handleAddClick}
									aria-label='Add order'
								>
									<PlusIcon
										size={20}
										className='size-5'
										aria-hidden='true'
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add new order</p>
							</TooltipContent>
						</Tooltip>

						{/* Status Filter Popover */}
						<StatusFilter
							uniqueValues={uniqueStatusValues}
							selectedValues={selectedStatuses}
							counts={statusCounts}
							onStatusChange={handleStatusChange}
							id={id}
						/>

						{/* Reorder Button with Tooltip */}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size='icon'
									variant='ghost'
									className='h-8 w-8'
									onClick={handleReorder}
									aria-label='Reorder'
								>
									<ArrowUpDownIcon
										size={20}
										className='size-5'
										aria-hidden='true'
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Reverse table order</p>
							</TooltipContent>
						</Tooltip>
					</div>

					{/* Search Input */}
					<div className='relative'>
						<Input
							id={`${id}-search`}
							ref={inputRef}
							className={cn(
								'peer w-48 ps-9 h-9 bg-white/40 active:ring-1 placeholder:text-subtle border rounded-lg border-black/10',
								Boolean(searchValue) && 'pe-9'
							)}
							value={searchValue}
							onChange={(e) => table.getColumn('id')?.setFilterValue(e.target.value)}
							placeholder='Search'
							type='text'
							aria-label='Search orders'
						/>
						<div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground peer-disabled:opacity-50'>
							<SearchIcon
								size={16}
								aria-hidden='true'
								className='text-subtle'
							/>
						</div>
						{Boolean(searchValue) && (
							<button
								className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-subtle transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
								aria-label='Clear filter'
								onClick={() => {
									table.getColumn('id')?.setFilterValue('');
									if (inputRef.current) {
										inputRef.current.focus();
									}
								}}
								type='button'
							>
								<CircleXIcon
									size={16}
									aria-hidden='true'
								/>
							</button>
						)}
					</div>
				</div>

				{/* Add Order Dialog */}
				<AddOrderDialog
					open={isAddDialogOpen}
					onOpenChange={setIsAddDialogOpen}
					onAddOrder={handleAddOrder}
				/>

				{/* Table */}
				<div className='overflow-hidden rounded-lg bg-background'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className='hover:bg-transparent '
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className='h-11 text-secondary'
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className='hover:bg-[#F7F9FB] rounded-lg border-black/5 group'
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'
									>
										No orders found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				<div className='flex items-end justify-end gap-2'>
					<Pagination className='justify-end'>
						<PaginationContent>
							<PaginationItem>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size='icon'
											variant='ghost'
											className='h-8 w-8 disabled:pointer-events-none disabled:opacity-50 rounded-lg'
											onClick={() => table.previousPage()}
											disabled={!table.getCanPreviousPage()}
											aria-label='Go to previous page'
										>
											<LeftChevronIcon
												className='size-3'
												aria-hidden='true'
											/>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Previous page</p>
									</TooltipContent>
								</Tooltip>
							</PaginationItem>
							{Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => {
								const isCurrentPage = currentPage === pageIndex;
								const showPage =
									pageIndex === 0 ||
									pageIndex === totalPages - 1 ||
									Math.abs(pageIndex - currentPage) <= 1;

								if (!showPage) {
									if (pageIndex === currentPage - 2 || pageIndex === currentPage + 2) {
										return (
											<PaginationItem key={pageIndex}>
												<span className='px-2 text-muted-foreground'>...</span>
											</PaginationItem>
										);
									}
									return null;
								}

								return (
									<PaginationItem key={pageIndex}>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													size='icon'
													variant='ghost'
													className={cn(
														'h-8 w-8 rounded-lg',
														isCurrentPage && 'border-foreground/20 bg-muted rounded-lg  '
													)}
													onClick={() => table.setPageIndex(pageIndex)}
													aria-label={`Go to page ${pageIndex + 1}`}
													aria-current={isCurrentPage ? 'page' : undefined}
												>
													{pageIndex + 1}
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Page {pageIndex + 1}</p>
											</TooltipContent>
										</Tooltip>
									</PaginationItem>
								);
							})}
							<PaginationItem>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											size='icon'
											variant='ghost'
											className='h-8 w-8 disabled:pointer-events-none disabled:opacity-50 rounded-lg'
											onClick={() => table.nextPage()}
											disabled={!table.getCanNextPage()}
											aria-label='Go to next page'
										>
											<RightChevronIcon
												className='size-3'
												aria-hidden='true'
											/>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Next page</p>
									</TooltipContent>
								</Tooltip>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</TooltipProvider>
	);
}
