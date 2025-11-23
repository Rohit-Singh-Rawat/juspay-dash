'use client';

import * as React from 'react';

interface RightSidebarContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
	toggle: () => void;
}

const RightSidebarContext = React.createContext<RightSidebarContextType | null>(null);

export function useRightSidebar() {
	const context = React.useContext(RightSidebarContext);
	if (!context) {
		throw new Error('useRightSidebar must be used within RightSidebarProvider');
	}
	return context;
}

export function RightSidebarProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(true);

	const toggle = React.useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const value = React.useMemo(
		() => ({
			open,
			setOpen,
			toggle,
		}),
		[open, toggle]
	);

	return <RightSidebarContext.Provider value={value}>{children}</RightSidebarContext.Provider>;
}
