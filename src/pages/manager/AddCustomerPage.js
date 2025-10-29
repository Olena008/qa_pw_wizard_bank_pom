import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  };

  async fillFirstNameField(firstName) {
    await this.firstNameInput.fill(firstName)
  };

  async fillLastNameField(lastName) {
    await this.lastNameInput.fill(lastName)
  };

  async fillPostCodeField(postCode) {
    await this.postCodeInput.fill(postCode)
  };

  async clickAddCustomerButton() {
    await this.addCustomerButton.click()
  };

  async clickCustomersButton() {
    await this.customersButton.click()
  };
}
