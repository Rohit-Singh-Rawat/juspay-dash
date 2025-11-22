import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { NavigationSidebar } from '@/components/sidebar/navigation-sidebar';
import { ActivitySidebar } from '@/components/sidebar/activity-sidebar';
import { Header } from '@/components/layout/header';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { SidebarsProvider } from '@/contexts/sidebars-context';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<FavoritesProvider>
			<SidebarsProvider>
				<SidebarProvider>
					<NavigationSidebar />
					<SidebarInset>
						<Header />
						<div className='flex flex-1 flex-col gap-4 p-6'>{children}</div>
					</SidebarInset>
					<ActivitySidebar />
				</SidebarProvider>
			</SidebarsProvider>
		</FavoritesProvider>
	);
}
