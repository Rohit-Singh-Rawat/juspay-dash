'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Separator } from '../ui/separator';

export const REVENUE_DATA = [
	{ month: "Jan", currentWeek: 13000000, previousWeek: 8000000 },
	{ month: "Feb", currentWeek: 8000000, previousWeek: 17000000 },
	{ month: "Mar", currentWeek: 13000000, previousWeek: 12000000 },
	{ month: "Apr", currentWeek: 17000000, previousWeek: 10000000 },
	{ month: "May", currentWeek: 20000000, previousWeek: 13000000 },
	{ month: "Jun", currentWeek: 21000000, previousWeek: 23000000 },
];

export const REVENUE_VALUES = {
	currentWeek: { label: "Current Week", value: 58211000 },
	previousWeek: { label: "Previous Week", value: 68768000 },
};

const chartData = REVENUE_DATA.map((item, index) => ({
	...item,
	currentWeekActual: index <= 3 ? item.currentWeek : null,
	currentWeekProjected: index >= 3 ? item.currentWeek : null,
}));

const chartConfig = {
	previousWeek: {
		label: 'Previous Week',
		color: 'var(--revenue-previous)',
	},
	currentWeekActual: {
		label: 'Current Week',
		color: 'var(--revenue-current)',
	},
	currentWeekProjected: {
		label: 'Current Week',
		color: 'var(--revenue-current)',
	},
} satisfies ChartConfig;

export function RevenueChart() {
	return (
		<Card className='bg-[#F7F9FB] dark:bg-card border-0 shadow-none rounded-2xl gap-2 flex-1 h-full'>
			<CardHeader className='flex flex-col sm:flex-row items-start sm:items-center justify-start space-y-2 sm:space-y-0 pb-4 gap-2'>
				<CardTitle className='text-sm font-semibold text-primary'>Revenue</CardTitle>
				<div className='hidden sm:block w-px h-5 bg-border mx-2' />
				<div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm'>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 rounded-full bg-revenue-current' />
						<span className='text-xs py-1 px-2'>
							{REVENUE_VALUES.currentWeek.label} <span className='font-semibold ml-1'>${REVENUE_VALUES.currentWeek.value.toLocaleString()}</span>
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 rounded-full bg-revenue-previous' />
						<span className='text-xs py-1 px-2'>
								{REVENUE_VALUES.previousWeek.label} <span className='font-semibold ml-1'>${REVENUE_VALUES.previousWeek.value.toLocaleString()}</span>
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='h-[200px] sm:h-[250px] w-full'
				>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
							top: 12,
							bottom: 12,
						}}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray='0'
							stroke='#E5E7EB'
							className='dark:stroke-border'
						/>
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							tickFormatter={(value) => value.slice(0, 3)}
							tick={{ fill: 'var(--secondary)', fontSize: 12 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							tickFormatter={(value) => {
								if (value >= 1000000) return `${value / 1000000}M`;
								if (value >= 1000) return `${value / 1000}K`;
								return value;
							}}
							tick={{ fill: 'var(--secondary)', fontSize: 12 }}
							domain={[0, 30000000]}
							ticks={[0, 10000000, 20000000, 30000000]}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Line
							dataKey='previousWeek'
							type='monotone'
							stroke='var(--color-previousWeek)'
							strokeWidth={3}
							dot={false}
							animationEasing='ease-out'
							animateNewValues={false}
							radius={10}
							strokeLinejoin='round'
							strokeLinecap='round'
						/>
						<Line
							dataKey='currentWeekActual'
							type='monotone'
							stroke='var(--color-currentWeekActual)'
							strokeWidth={3}
							dot={false}
							connectNulls={true}
							strokeLinejoin='round'
							strokeLinecap='round'
							animationEasing='ease-out'
							animateNewValues={false}
						/>
						<Line
							dataKey='currentWeekProjected'
							type='monotone'
							stroke='var(--color-currentWeekProjected)'
							strokeWidth={3}
							strokeDasharray='10 10'
							dot={false}
							connectNulls={true}
							strokeLinejoin='round'
							strokeLinecap='round'
							animationEasing='ease-out'
							animateNewValues={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
