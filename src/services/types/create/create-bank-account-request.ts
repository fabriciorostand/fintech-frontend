export type CreateBankAccountRequest = {
    userId: number;
    branchId: number;
    bankId: number;
    number: string;
    balance: number;
};