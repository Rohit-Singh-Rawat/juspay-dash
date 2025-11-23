import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { NavigationSidebar } from '@/components/sidebar/navigation-sidebar';
import { ActivitySidebar } from '@/components/sidebar/activity-sidebar';
import { Header } from '@/components/layout/header';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { RightSidebarProvider } from '@/contexts/sidebars-context';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<FavoritesProvider>
			<RightSidebarProvider>
				<SidebarProvider>
					<NavigationSidebar />
					<SidebarInset className='h-screen overflow-hidden'>
						<div className='flex h-full w-full'>
							<div className='flex flex-1 flex-col min-w-0'>
								<Header />
								<div className='flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 h-[calc(100dvh-56px)] overflow-y-auto'>
									{children}
								</div>
							</div>
							<ActivitySidebar />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</RightSidebarProvider>
		</FavoritesProvider>
	);
}
