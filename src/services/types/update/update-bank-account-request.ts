export type UpdateBankAccountRequest = {
    id: number;
    userId: number;
    branchId: number;
    bankId: number;
    number: string;
    balance: number;
};