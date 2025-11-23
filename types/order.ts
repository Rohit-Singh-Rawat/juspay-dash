export type OrderStatus = 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';

export interface Order {
	id: string;
	user: {
		name: string;
		avatar: string;
	};
	project: string;
	address: string;
	date: string;
	status: OrderStatus;
}
