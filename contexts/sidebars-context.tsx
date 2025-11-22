'use client';

import * as React from 'react';

interface SidebarsContextType {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	toggleLeftSidebar: () => void;
	toggleRightSidebar: () => void;
	setLeftSidebarOpen: (open: boolean) => void;
	setRightSidebarOpen: (open: boolean) => void;
}

const SidebarsContext = React.createContext<SidebarsContextType | null>(null);

export function useSidebars() {
	const context = React.useContext(SidebarsContext);
	if (!context) {
		throw new Error('useSidebars must be used within SidebarsProvider');
	}
	return context;
}

export function SidebarsProvider({ children }: { children: React.ReactNode }) {
	const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(true);
	const [rightSidebarOpen, setRightSidebarOpen] = React.useState(true);

	const toggleLeftSidebar = React.useCallback(() => {
		setLeftSidebarOpen((prev) => !prev);
	}, []);

	const toggleRightSidebar = React.useCallback(() => {
		setRightSidebarOpen((prev) => !prev);
	}, []);

	const value = React.useMemo(
		() => ({
			leftSidebarOpen,
			rightSidebarOpen,
			toggleLeftSidebar,
			toggleRightSidebar,
			setLeftSidebarOpen,
			setRightSidebarOpen,
		}),
		[leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar]
	);

	return <SidebarsContext.Provider value={value}>{children}</SidebarsContext.Provider>;
}

