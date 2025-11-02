import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let customersListPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test.afterEach(async () => {
  await customersListPage.open();
  await customersListPage.deleteCustomer(firstName)
});

test('Assert manager can search customer by Last Name', async () => {
  await customersListPage.open();
  await customersListPage.search(lastName);
  await customersListPage.assertRowIsPresentInSearchResult(lastName);
  await customersListPage.assertNoOtherRowsInSearchResult();
});
