import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let customerListPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customerListPage = new CustomersListPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  await customerListPage.open();
  await customerListPage.deleteCustomer();
  await customerListPage.assertCustomerIsNotPresentInTheRow(firstName);
  await page.reload();
  await customerListPage.assertCustomerIsNotPresentInTheRow(firstName);
});
