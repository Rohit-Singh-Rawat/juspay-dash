import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { NavigationSidebar } from '@/components/sidebar/navigation-sidebar';
import { ActivitySidebar } from '@/components/sidebar/activity-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className='flex h-screen'>
			<NavigationSidebar />
			<main className='flex-1'>
				<div className='border-b p-4'>
					<SidebarTrigger />
				</div>
				<div className='p-6'>{children}</div>
			</main>
			<ActivitySidebar />
		</SidebarProvider>
	);
}
