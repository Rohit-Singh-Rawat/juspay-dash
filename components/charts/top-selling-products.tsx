'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const productsData = [
	{
		id: 1,
		name: 'ASOS Ridley High Waist',
		price: '$79.49',
		quantity: 82,
		amount: '$6,518.18',
	},
	{
		id: 2,
		name: 'Marco Lightweight Shirt',
		price: '$128.50',
		quantity: 37,
		amount: '$4,754.50',
	},
	{
		id: 3,
		name: 'Half Sleeve Shirt',
		price: '$39.99',
		quantity: 64,
		amount: '$2,559.36',
	},
	{
		id: 4,
		name: 'Lightweight Jacket',
		price: '$20.00',
		quantity: 184,
		amount: '$3,680.00',
	},
	{
		id: 5,
		name: 'Marco Shoes',
		price: '$79.49',
		quantity: 64,
		amount: '$1,965.81',
	},
];

export function TopSellingProducts() {
	return (
		<Card className='bg-[#F7F9FB] border-0 shadow-none rounded-2xl'>
			<CardHeader className='flex flex-row items-center justify-start space-y-0 pb-4'>
				<CardTitle className='text-sm font-semibold text-primary'>
					Top Selling Products
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='w-full'>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead>
								<tr className='border-b border-border'>
									<th className='text-left text-xs font-semibold text-primary py-3 px-2'>
										Name
									</th>
									<th className='text-left text-xs font-semibold text-primary py-3 px-2'>
										Price
									</th>
									<th className='text-left text-xs font-semibold text-primary py-3 px-2'>
										Quantity
									</th>
									<th className='text-left text-xs font-semibold text-primary py-3 px-2'>
										Amount
									</th>
								</tr>
							</thead>
							<tbody>
								{productsData.map((product) => (
									<tr
										key={product.id}
										className='border-b border-border last:border-0 hover:bg-white/50 transition-colors'
									>
										<td className='py-4 px-2 text-sm'>{product.name}</td>
										<td className='py-4 px-2 text-sm text-secondary-foreground'>
											{product.price}
										</td>
										<td className='py-4 px-2 text-sm text-secondary-foreground'>
											{product.quantity}
										</td>
										<td className='py-4 px-2 text-sm font-semibold'>{product.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

