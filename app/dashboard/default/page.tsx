'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectionsChart } from '@/components/charts/projections-chart';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { RevenueLocationChart } from '@/components/charts/revenue-location-chart';
import { TopSellingProducts } from '@/components/charts/top-selling-products';
import { TotalSalesChart } from '@/components/charts/total-sales-chart';

const metricCards = [
	{
		title: 'Customers',
		value: '3,781',
		change: '+11.01%',
		isPositive: true,
		useSecondary: true,
	},
	{
		title: 'Orders',
		value: '1,219',
		change: '-0.03%',
		isPositive: false,
		useSecondary: false,
	},
	{
		title: 'Revenue',
		value: '$695',
		change: '+15.03%',
		isPositive: true,
		useSecondary: false,
	},
	{
		title: 'Growth',
		value: '30.1%',
		change: '+6.08%',
		isPositive: true,
		useSecondary: true,
	},
];

interface MetricCardProps {
	title: string;
	value: string;
	change: string;
	isPositive: boolean;
	useSecondary?: boolean;
}

function MetricCard({ title, value, change, isPositive, useSecondary }: MetricCardProps) {
	return (
		<Card
			className={`border-0 shadow-none rounded-2xl p-4 sm:p-6 gap-1 justify-center ${
				useSecondary ? 'bg-card-secondary dark:bg-card-secondary' : 'bg-card dark:bg-card'
			}`}
		>
			<CardHeader className='p-0'>
				<CardTitle
					className={`text-xs sm:text-sm font-semibold px-2 py-1 ${
						useSecondary ? 'text-primary dark:text-black' : 'text-primary'
					}`}
				>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex justify-between items-center p-y-1 px-2'>
				<div
					className={`text-xl sm:text-2xl font-semibold ${useSecondary ? 'dark:text-black' : ''}`}
				>
					{value}
				</div>
				<div className='flex items-center gap-1 mt-1 text-xs sm:text-sm'>
					<span className={`${useSecondary ? 'text-primary dark:text-black' : 'text-primary'}`}>
						{change}
					</span>
					{isPositive ? (
						<TrendingUp
							className={`h-3 w-3 sm:h-4 sm:w-4 ${
								useSecondary ? 'text-primary dark:text-black' : 'text-primary'
							}`}
						/>
					) : (
						<TrendingDown
							className={`h-3 w-3 sm:h-4 sm:w-4 ${
								useSecondary ? 'text-primary dark:text-black' : 'text-primary'
							}`}
						/>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export default function DefaultPage() {
	return (
		<div className='flex flex-col gap-4 w-full mx-auto px-2 sm:px-0'>
			<h1 className='text-sm font-semibold px-2 py-1'>Default Dashboard</h1>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-7'>
				{/* Left side - Metric Cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 lg:col-span-1'>
					{metricCards.map((metric) => (
						<MetricCard
							key={metric.title}
							title={metric.title}
							value={metric.value}
							change={metric.change}
							isPositive={metric.isPositive}
							useSecondary={metric.useSecondary}
						/>
					))}
				</div>

				{/* Right side - Chart */}
				<div className='lg:col-span-1'>
					<ProjectionsChart />
				</div>
			</div>

			{/* Revenue and Location Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7 mt-3'>
				<div className='lg:col-span-3'>
					<RevenueChart />
				</div>
				<div className='lg:col-span-1'>
					<RevenueLocationChart />
				</div>
			</div>

			{/* Top Selling Products and Total Sales */}
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7 mt-3'>
				<div className='lg:col-span-3'>
					<TopSellingProducts />
				</div>
				<div className='lg:col-span-1'>
					<TotalSalesChart />
				</div>
			</div>
		</div>
	);
}
