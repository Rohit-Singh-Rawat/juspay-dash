'use client';

import { Pie, PieChart, Cell, Label, Sector, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
	{ name: 'Direct', value: 300.56, color: '#1C1C1C' },
	{ name: 'Affilliate', value: 135.18, color: '#BAEDBD' },
	{ name: 'Sponsored', value: 154.02, color: '#95A4FC' },
	{ name: 'E-mail', value: 48.96, color: '#B1E3FF' },
];

const chartConfig = {
	value: {
		label: 'Sales',
	},
} satisfies ChartConfig;

export function TotalSalesChart() {
	const total = chartData.reduce((sum, item) => sum + item.value, 0);
	const directPercentage = ((chartData[0].value / total) * 100).toFixed(1);

	return (
		<Card className='bg-[#F7F9FB] dark:bg-card border-0 shadow-none rounded-2xl flex-1 h-full gap-2' >
			<CardHeader className='flex flex-row items-center justify-start space-y-0 pb-0'>
				<CardTitle className='text-sm font-semibold text-primary'>Total Sales</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col items-center pb-6'>
				<ChartContainer
					config={chartConfig}
					className='h-[150px]  w-full '
				>
					<PieChart>
						<Pie
							data={chartData}
							dataKey='value'
							nameKey='name'
							innerRadius='80%'
							outerRadius='100%'
							cornerRadius='50%'
							strokeWidth={0}
							strokeLinecap='butt'
							blendStroke={true}
							paddingAngle={5}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
								/>
							))}
							
						</Pie>
						<ChartTooltip
							content={<ChartTooltipContent hideLabel />}
							formatter={(value: number, name: string) => (
								<div className='flex items-center gap-2'>
									<span className='font-medium'>{name}:</span>
									<span className='font-bold'>${value.toFixed(2)}</span>
								</div>
							)}
						/>
					</PieChart>
				</ChartContainer>

				<div className='w-full mt-4 space-y-3'>
					{chartData.map((item, index) => (
						<div
							key={index}
							className='flex items-center justify-between'
						>
							<div className='flex items-center gap-2'>
								<div
									className='w-2 h-2 rounded-full'
									style={{ backgroundColor: item.color }}
								/>
								<span className='text-sm'>{item.name}</span>
							</div>
							<span className='text-sm font-normal	'>${item.value.toFixed(2)}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
