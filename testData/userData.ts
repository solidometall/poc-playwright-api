import { currentTimestamp } from '../utils/generalFunctions';

export type customer = {
	customerId?: number,
	name: string,
	address: string,
	email: string,
	phone: string,
	username: string,
	password: string,
	enabled: boolean,
	role: string,
};

export function buildFakeCustomer(): customer {
	const id: number = currentTimestamp();
	return {
		name: `Test User ${id}`,
		address: `144 Townsend, San Francisco ${id}`,
		email: `test.user.${id}@test.com`,
		phone: id.toString(),
		username: `testuser${id}`,
		password: 'testpassword',
		enabled: true,
		role: 'USER',
	};
}
