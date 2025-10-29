import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByTestId('currency');
    this.customerDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  };

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  };

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency)
  };

  async assertCorrectCurrencySelected(currency) {
    const selectedValue = await this.currencyDropDown.inputValue()
    await expect(selectedValue).toBe(currency);
  };

  async selectCustomer(firstName, lastName) {
    await this.customerDropDown.selectOption(`${firstName} ${lastName}`);
  };

  async clickProcessButton() {
    await this.processButton.click();
  };

  async clickCustomersButton() {
    await this.customersButton.click()
  };
}
