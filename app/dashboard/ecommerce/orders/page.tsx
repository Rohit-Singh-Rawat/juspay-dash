'use client';

import { OrderList } from '@/components/tables/order-list';
import { ordersData } from '@/data/orders';

export default function OrdersPage() {
	return (
		<div className='flex flex-col gap-6 w-full'>
			<div className='flex items-center justify-between px-2 py-1'>
				<h1 className='text-sm font-semibold'>Order List</h1>
			</div>
			<OrderList data={ordersData} />
		</div>
	);
}
