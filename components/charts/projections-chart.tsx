'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
	{ month: 'January', actual: 10000000, projected: 12000000 },
	{ month: 'February', actual: 15000000, projected: 18000000 },
	{ month: 'March', actual: 20000000, projected: 22000000 },
	{ month: 'April', actual: 18000000, projected: 20000000 },
	{ month: 'May', actual: 25000000, projected: 28000000 },
	{ month: 'June', actual: 22000000, projected: 30000000 },
].map((item) => ({
	...item,
	difference: item.projected - item.actual,
}));

const chartConfig = {
	actual: {
		label: 'Actual',
		color: 'var(--projections-actual)',
	},
	projected: {
		label: 'Projected',
		color: 'var(--projections-projected)',
	},
	difference: {
		label: 'Difference',
		color: 'var(--projections-projected)',
	},
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload || !payload.length) return null;

	const data = payload[0].payload;

	return (
		<div className='rounded-lg border bg-background p-1.5 shadow-sm'>
			<div className='grid gap-1.5'>
				<div className='flex flex-col'>
					<span className='text-[0.65rem] uppercase text-muted-foreground'>{data.month}</span>
				</div>
				<div className='grid gap-0.5'>
					<div className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-1.5'>
							<div
								className='h-2 w-2 rounded-full'
								style={{ backgroundColor: 'var(--projections-actual)' }}
							/>
							<span className='text-xs text-muted-foreground'>Actual</span>
						</div>
						<span className='text-xs font-medium'>${data.actual.toLocaleString()}</span>
					</div>
					<div className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-1.5'>
							<div
								className='h-2 w-2 rounded-full'
								style={{ backgroundColor: 'var(--projections-projected)' }}
							/>
							<span className='text-xs text-muted-foreground'>Projected</span>
						</div>
						<span className='text-xs font-medium'>${data.projected.toLocaleString()}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export function ProjectionsChart() {
	return (
		<Card className='bg-[#F7F9FB] dark:bg-card border-0 shadow-none rounded-2xl w-full gap-2'>
			<CardHeader>
				<CardTitle className='text-sm font-semibold text-primary'>Projections vs Actuals</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='h-[190px] sm:h-[250px] w-full'
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						barCategoryGap='20%'
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							tick={{ fill: 'var(--secondary)', fontSize: 12 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => {
								if (value >= 1000000) return `${value / 1000000}M`;
								if (value >= 1000) return `${value / 1000}K`;
								return value;
							}}
							tick={{ fill: 'var(--secondary)', fontSize: 12 }}
						/>
						<ChartTooltip content={<CustomTooltip />} />
						<Bar
							dataKey='actual'
							stackId='a'
							fill='var(--color-actual)'
							radius={[0, 0, 0, 0]}
							barSize={20}
							animationEasing='ease-out'
						/>
						<Bar
							dataKey='difference'
							stackId='a'
							fill='var(--color-difference)'
							radius={[4, 4, 0, 0]}
							barSize={20}
							animationEasing='ease-out'
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
