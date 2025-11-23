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
		bgColor: '#E3F5FF',
	},
	{
		title: 'Orders',
		value: '1,219',
		change: '-0.03%',
		isPositive: false,
		bgColor: '#F7F9FB',
	},
	{
		title: 'Revenue',
		value: '$695',
		change: '+15.03%',
		isPositive: true,
		bgColor: '#F7F9FB',
	},
	{
		title: 'Growth',
		value: '30.1%',
		change: '+6.08%',
		isPositive: true,
		bgColor: '#E5ECF6',
	},
];

interface MetricCardProps {
	title: string;
	value: string;
	change: string;
	isPositive: boolean;
	bgColor: string;
}

function MetricCard({ title, value, change, isPositive, bgColor }: MetricCardProps) {
	return (
		<Card
			className='border-0 shadow-none rounded-2xl p-6 gap-1 justify-center '
			style={{ backgroundColor: bgColor }}
		>
			<CardHeader className='p-0'>
				<CardTitle className='text-sm font-semibold text-primary px-2 py-1'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='flex justify-between items-center p-0'>
				<div className='text-3xl font-bold'>{value}</div>
				<div className='flex items-center gap-1 mt-1 text-sm'>
					<span className='text-primary'>{change}</span>
					{isPositive ? (
						<TrendingUp className='h-4 w-4 text-primary' />
					) : (
						<TrendingDown className='h-4 w-4 text-primary' />
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export default function DefaultPage() {
	return (
		<div className='flex flex-col gap-4 max-w-6xl w-full mx-auto'>
			<h1 className='text-sm font-semibold px-2 py-1'>Default Dashboard</h1>

			<div className='grid grid-cols-1 xl:grid-cols-2 gap-7'>
				{/* Left side - Metric Cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-7 xl:col-span-1'>
					{metricCards.map((metric) => (
						<MetricCard
							key={metric.title}
							title={metric.title}
							value={metric.value}
							change={metric.change}
							isPositive={metric.isPositive}
							bgColor={metric.bgColor}
						/>
					))}
				</div>

				{/* Right side - Chart */}
				<div className='xl:col-span-1'>
					<ProjectionsChart />
				</div>
			</div>

			{/* Revenue and Location Grid */}
			<div className='grid grid-cols-1 xl:grid-cols-4 gap-7 mt-3'>
				<div className='xl:col-span-3'>
					<RevenueChart />
				</div>
				<div className='xl:col-span-1'>
					<RevenueLocationChart />
				</div>
			</div>

			{/* Top Selling Products and Total Sales */}
			<div className='grid grid-cols-1 xl:grid-cols-4 gap-7 mt-3'>
				<div className='xl:col-span-3'>
					<TopSellingProducts />
				</div>
				<div className='xl:col-span-1'>
					<TotalSalesChart />
				</div>
			</div>
		</div>
	);
}
