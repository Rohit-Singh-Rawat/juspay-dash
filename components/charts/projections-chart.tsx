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
	{ month: 'January', projected: 150500, actual: 142500 },
	{ month: 'February', projected: 27000, actual: 25800 },
	{ month: 'March', projected: 22000, actual: 18200 },
	{ month: 'April', projected: 30200, actual: 28000 },
	{ month: 'May', projected: 15000, actual: 10000 },
	{ month: 'June', projected: 25000, actual: 22000 },
];

const chartConfig = {
	projected: {
		label: 'Projected',
		color: '#cfdeea',
	},
	actual: {
		label: 'Actual',
		color: '#A8C5DA',
	},
} satisfies ChartConfig;

export function ProjectionsChart() {
	return (
		<Card className='bg-[#F7F9FB] border-0 shadow-none rounded-2xl'>
			<CardHeader>
				<CardTitle className='text-sm font-semibold text-primary'>Projections vs Actuals</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						barGap={-20}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => {
								if (value >= 1000000) return `${value / 1000000}M`;
								if (value >= 1000) return `${value / 1000}K`;
								return value;
							}}
							tick={{ fill: 'hsl(var(--secondary))', fontSize: 12 }}
							
						/>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Bar
							dataKey='projected'
							fill='var(--color-projected)'
							radius={[4, 4, 0, 0]}
							barSize={20}
							animationBegin={0}
							animationDuration={500}
							animationEasing='ease-out'
						/>
						<Bar
							dataKey='actual'
							fill='var(--color-actual)'
							radius={[0, 0, 0, 0]}
							barSize={20}
							animationBegin={200}
							animationDuration={500}
							animationEasing='ease-out'
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
