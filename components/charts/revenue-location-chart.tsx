'use client';

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const locationData = [
	{
		name: 'New York',
		coordinates: [-74.006, 40.7128],
		value: '72K',
		percentage: 72,
	},
	{
		name: 'San Francisco',
		coordinates: [-122.4194, 37.7749],
		value: '39K',
		percentage: 39,
	},
	{
		name: 'Sydney',
		coordinates: [151.2093, -33.8688],
		value: '25K',
		percentage: 25,
	},
	{
		name: 'Singapore',
		coordinates: [103.8198, 1.3521],
		value: '61K',
		percentage: 61,
	},
];

export function RevenueLocationChart() {
	return (
		<Card className='bg-[#F7F9FB] border-0 shadow-none rounded-2xl h-full flex flex-col gap-2'>
			<CardHeader className=''>
				<CardTitle className='text-sm font-semibold text-primary'>Revenue by Location</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 flex flex-col'>
				<div className='relative w-full shrink-0 overflow-hidden'>
					<ComposableMap
						projection='geoMercator'
						projectionConfig={{
							scale: 150,
							center: [0, 20],
						}}
						className='w-full h-full cursor-grab'
					>
						<ZoomableGroup >
							<Geographies geography={geoUrl}>
								{({ geographies }: { geographies: any[] }) =>
									geographies.map((geo: any) => (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											fill='#D6E4F0'
											stroke='#ffffff'
											strokeWidth={0.5}
											style={{
												default: { outline: 'none' },
												hover: { outline: 'none', fill: '#A8C5DA' },
												pressed: { outline: 'none' },
											}}
										/>
									))
								}
							</Geographies>
							{locationData.map(({ name, coordinates }) => (
								<Marker
									key={name}
									coordinates={coordinates as [number, number]}
								>
									<circle
										r={8}
										fill='#1C1C1C'
										stroke='#ffffff'
										strokeWidth={2}
										style={{
											cursor: 'pointer',
											filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
										}}
									/>
								</Marker>
							))}
						</ZoomableGroup>
					</ComposableMap>
				</div>

				{/* Location List */}
				<div className='mt-3 space-y-2.5'>
					{locationData.map((location) => (
						<div
							key={location.name}
							className='space-y-1'
						>
							<div className='flex items-center justify-between'>
								<span className='text-xs font-normal text-primary'>{location.name}</span>
								<span className='text-xs font-normal'>{location.value}</span>
							</div>
							<div className='w-full bg-linear-to-r from-white/80 to-white rounded-full h-1'>
								<div
									className='bg-[#A8C5DA] h-1 rounded-full'
									style={{ width: `${location.percentage}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
