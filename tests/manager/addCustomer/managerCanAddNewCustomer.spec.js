import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customerListPage = new CustomersListPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.fillPostCodeField(postalCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.clickCustomersButton();
  await customerListPage.assertFirstName(firstName);
  await customerListPage.assertLastName(lastName);
  await customerListPage.assertPostCode(postalCode);
  await customerListPage.assertEmptyAccountNumberField();
});
