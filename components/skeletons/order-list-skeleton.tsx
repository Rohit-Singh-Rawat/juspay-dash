import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export function OrderListSkeleton() {
	return (
		<div className='space-y-4'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div className='flex flex-wrap items-center gap-3'>
					<Skeleton className='h-9 w-60' />
					<Skeleton className='h-9 w-32' />
					<Skeleton className='h-9 w-24' />
				</div>
			</div>

			<div className='overflow-hidden rounded-lg border bg-background'>
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-transparent'>
							<TableHead className='h-11 w-10'>
								<Skeleton className='h-4 w-4' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-20' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-16' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-24' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-20' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-16' />
							</TableHead>
							<TableHead className='h-11'>
								<Skeleton className='h-4 w-16' />
							</TableHead>
							<TableHead className='h-11 w-14' />
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, i) => (
							<TableRow key={i}>
								<TableCell>
									<Skeleton className='h-4 w-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-20' />
								</TableCell>
								<TableCell>
									<div className='flex items-center gap-3'>
										<Skeleton className='h-8 w-8 rounded-full' />
										<Skeleton className='h-4 w-24' />
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-32' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-36' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-4 w-20' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-6 w-20 rounded-full' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-8' />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-4'>
				<Skeleton className='h-9 w-32' />
				<Skeleton className='h-4 w-24' />
				<div className='flex items-center gap-2'>
					<Skeleton className='h-9 w-9' />
					<Skeleton className='h-9 w-9' />
					<Skeleton className='h-9 w-9' />
					<Skeleton className='h-9 w-9' />
				</div>
			</div>
		</div>
	);
}

