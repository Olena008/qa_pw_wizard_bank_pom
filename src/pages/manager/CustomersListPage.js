import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('tbody tr');
    this.lastTableRow = page.locator('tr').nth(-1);
    this.firstNameCell = this.lastTableRow.getByRole('cell').nth(0);
    this.lastNameCell = this.lastTableRow.getByRole('cell').nth(1);
    this.postCodeCell = this.lastTableRow.getByRole('cell').nth(2);
    this.accountNumberCell = this.lastTableRow.getByRole('cell').nth(3);
    this.deleteCustomerCell = this.lastTableRow.getByRole('button');
    this.searchInput = page.getByPlaceholder('Search Customer');
  };

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  };

  async assertFirstName(value) {
    await expect(this.firstNameCell).toHaveText(value)
  };

  async assertLastName(value) {
    await expect(this.lastNameCell).toHaveText(value)
  };

  async assertPostCode(value) {
    await expect(this.postCodeCell).toContainText(value)
  };

  async assertEmptyAccountNumberField() {
    await expect(this.accountNumberCell).toBeEmpty()
  };

  async deleteCustomer() {
    await this.deleteCustomerCell.click()
  };

  async assertCustomerIsNotPresentInTheRow(firstName) {
    const customerRow = this.page.locator('tr', { hasText: firstName });
    await expect(customerRow).toHaveCount(0);
  };

  async assertAccountNumberFieldNotEmpty() {
    await expect(this.accountNumberCell).not.toHaveCount(0);
  };

  async search(value) {
    await this.searchInput.fill(value);
  };

  async assertRowIsPresentInSearchResult(value) {
    const customerRow = this.page.locator('tr', { hasText: value });
    await expect(customerRow).toHaveCount(1);
  };

  async assertNoOtherRowsInSearchResult() {
    await expect(this.tableRows).toHaveCount(1);
  }
}
