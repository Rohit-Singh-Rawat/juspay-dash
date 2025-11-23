export function RightChevronIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='7'
			height='12'
			viewBox='0 0 7 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0.199593 11.0669C-0.0665311 10.8229 -0.0665311 10.4271 0.199593 10.1831L4.6875 6.06694C4.95363 5.82286 4.95363 5.42714 4.6875 5.18306L0.199594 1.06694C-0.0665303 0.822864 -0.0665302 0.427137 0.199594 0.183058C0.465718 -0.0610194 0.897191 -0.0610193 1.16331 0.183058L5.65122 4.29918C6.44959 5.03141 6.44959 6.21859 5.65122 6.95082L1.16331 11.0669C0.89719 11.311 0.465717 11.311 0.199593 11.0669Z'
				fill='currentColor'
			/>
		</svg>
	);
}

export function LeftChevronIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='7'
			height='12'
			viewBox='0 0 7 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6.80041 11.0669C7.06653 10.8229 7.06653 10.4271 6.80041 10.1831L2.3125 6.06694C2.04637 5.82286 2.04637 5.42714 2.3125 5.18306L6.80041 1.06694C7.06653 0.822864 7.06653 0.427137 6.80041 0.183058C6.53428 -0.0610194 6.10281 -0.0610193 5.83669 0.183058L1.34878 4.29918C0.550407 5.03141 0.550407 6.21859 1.34878 6.95082L5.83669 11.0669C6.10281 11.311 6.53428 11.311 6.80041 11.0669Z'
				fill='currentColor'
			/>
		</svg>
	);
}
