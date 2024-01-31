import { expect, test } from '../../fixtures/fixtureBuilder';
import customerRequests from '../../requests/customer/customerRequests';
import errorMessages from '../../utils/messages';
import { delay, parseCustomerIdFromResponse, parseCustomerUsernameFromResponse } from '../../utils/generalFunctions';
import { APIResponse } from '@playwright/test';
import { buildFakeCustomer, customer } from '../../testData/userData';

test.describe.serial('Create customer', () => {
	test('it should create a new customer successfully', async ({ apiContext }) => {
		const customerData: customer = buildFakeCustomer();
		const createCustomerResponse: APIResponse = await customerRequests.createCustomer(apiContext, customerData);
		const createCustomerResponseData = await createCustomerResponse.json();

		expect(createCustomerResponse.ok()).toBeTruthy();
		expect(createCustomerResponseData).toEqual(expect.objectContaining({ customerId: expect.any(Number) }));
	});

	test('it should return an error when username is already in use', async ({ apiContext, createCustomer }) => {
		const errorMsg: RegExp = errorMessages.customer.create.alreadyExists;
		const customerId: number = await parseCustomerIdFromResponse(createCustomer);
		await delay(1100);
		const existingCustomerUsername: string = await parseCustomerUsernameFromResponse(await customerRequests.searchCustomerById(apiContext, customerId));

		const newCustomerData: customer = buildFakeCustomer();
		newCustomerData.username = existingCustomerUsername;

		const newCustomerResponse: APIResponse = await customerRequests.createCustomer(apiContext, newCustomerData);
		const newCustomerResponseData = await newCustomerResponse.json();

		expect(newCustomerResponse.ok()).toBeFalsy();
		expect(newCustomerResponseData.errorMessage).toMatch(errorMsg);
	});
});
