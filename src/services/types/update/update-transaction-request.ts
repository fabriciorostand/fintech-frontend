export type UpdateTransactionRequest = {
  id: number;
  name: string;
  description: string;
  bankAccountId: number;
  transactionTypeId: number;
  transactionCategoryId: number;
  value: number;
  date: string;
};