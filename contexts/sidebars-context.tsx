'use client';

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

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
	const isMobile = useIsMobile();
	// Default to closed on mobile (sheet), open on desktop (sidebar)
	const [open, setOpen] = React.useState(() => {
		// Only check on client side
		if (typeof window !== 'undefined') {
			return window.innerWidth >= 768;
		}
		return true;
	});

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
