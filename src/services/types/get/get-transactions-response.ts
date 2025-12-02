export type Transaction = {
  id: number;
  bankAccountId: number;
  transactionTypeId: number;
  transactionCategoryId: number;
  name: string;
  value: number;
  date: string;
  description: string;
};

export type GetTransactionsResponse = {
  content: Transaction[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
