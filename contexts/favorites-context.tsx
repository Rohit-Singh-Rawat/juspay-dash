'use client';

import React, { createContext, useContext, useState } from 'react';
import { getIconForUrl } from '@/config/navigation';

interface MenuItem {
	title: string;
	url: string;
}

interface MenuItemWithIcon extends MenuItem {
	icon?: React.ComponentType<{ className?: string }>;
}

interface FavoritesContextType {
	favorites: MenuItem[];
	recent: MenuItem[];
	toggleFavorite: (item: MenuItem) => void;
	isFavorite: (url: string) => boolean;
	addToRecent: (item: MenuItem) => void;
	getFavoritesWithIcons: () => MenuItemWithIcon[];
	getRecentWithIcons: () => MenuItemWithIcon[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const INITIAL_FAVORITES: MenuItem[] = [
	{ title: 'Default', url: '/dashboard/default' },
	{ title: 'Projects', url: '/dashboard/projects-dash' },
];

const INITIAL_RECENT: MenuItem[] = [
	{ title: 'Online Courses', url: '/dashboard/online-courses' },
	{ title: 'eCommerce', url: '/dashboard/ecommerce' },
	{ title: 'Overview', url: '/pages/user-profile/overview' },
];

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
	const [favorites, setFavorites] = useState<MenuItem[]>(INITIAL_FAVORITES);
	const [recent, setRecent] = useState<MenuItem[]>(INITIAL_RECENT);

	const toggleFavorite = (item: MenuItem) => {
		setFavorites((prev) => {
			const exists = prev.find((fav) => fav.url === item.url);
			if (exists) {
				return prev.filter((fav) => fav.url !== item.url);
			}
			return [...prev, item];
		});
	};

	const isFavorite = (url: string) => {
		return favorites.some((fav) => fav.url === url);
	};

	const addToRecent = (item: MenuItem) => {
		setRecent((prev) => {
			const filtered = prev.filter((r) => r.url !== item.url);
			return [item, ...filtered].slice(0, 5);
		});
	};

	const getFavoritesWithIcons = (): MenuItemWithIcon[] => {
		return favorites.map((item) => ({
			...item,
			icon: getIconForUrl(item.url),
		}));
	};

	const getRecentWithIcons = (): MenuItemWithIcon[] => {
		return recent.map((item) => ({
			...item,
			icon: getIconForUrl(item.url),
		}));
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				recent,
				toggleFavorite,
				isFavorite,
				addToRecent,
				getFavoritesWithIcons,
				getRecentWithIcons,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be used within FavoritesProvider');
	}
	return context;
}
