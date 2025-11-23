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

const chartData = [
	{ month: 'January', currentWeek: 13000, previousWeek: 7000 },
	{ month: 'February', currentWeek: 17000, previousWeek: 16000 },
	{ month: 'March', currentWeek: 8000, previousWeek: 17000 },
	{ month: 'April', currentWeek: 16000, previousWeek: 11000 },
	{ month: 'May', currentWeek: 20000, previousWeek: 19000 },
	{ month: 'June', currentWeek: 20000, previousWeek: 24000 },
];

const chartConfig = {
	currentWeek: {
		label: 'Current Week',
		color: 'var(--revenue-current)',
	},
	previousWeek: {
		label: 'Previous Week',
		color: 'var(--revenue-previous)',
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
							Current Week <span className='font-semibold ml-1'>$58,211</span>
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-2 h-2 rounded-full bg-revenue-previous' />
						<span className='text-xs py-1 px-2'>
							Previous Week <span className='font-semibold ml-1'>$68,768</span>
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
							tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
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
							tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
							domain={[0, 30000]}
							ticks={[0, 10000, 20000, 30000]}
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
							animationBegin={0}
							animationDuration={500}
							animationEasing='ease-out'
							radius={10}
							strokeLinejoin='round'
							strokeLinecap='round'
						/>
						<Line
							dataKey='currentWeek'
							type='monotone'
							stroke='var(--color-currentWeek)'
							strokeWidth={3}
							dot={false}
							strokeDasharray='4 10'
							strokeDashoffset={0}
							strokeLinejoin='round'
							strokeLinecap='round'
							animationBegin={200}
							animationDuration={500}
							animationEasing='ease-out'
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
