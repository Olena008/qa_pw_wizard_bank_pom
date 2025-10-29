import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let addCustomerPage;
let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(firstName, lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await openAccountPage.clickCustomersButton();
  await customersListPage.assertAccountNumberFieldNotEmpty();
});
