interface ICreateTransactionDTO {
    id?: string;
    merchant: string;
    totalAmount: number;
    mcc: string;
    accountId: string;
}

export { ICreateTransactionDTO };
