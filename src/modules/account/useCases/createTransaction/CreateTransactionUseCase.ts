import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "@modules/account/repositories/ITransactionsRepository";
import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";
import { IMerchantRepository } from "@modules/merchant/repositories/IMerchantsRepository";
import { getCategoryFromTransaction } from "@modules/account/utils/TransactionsUtils";

interface IRequest {
    merchant: string;
    totalAmount: number;
    mcc: string;
    accountId: string;
}

@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,

        @inject("AccountsRepository")
        private accountsRepository: IAccountRepository,

        @inject("MerchantsRepository")
        private merchantsRepository: IMerchantRepository
    ) {}

    async execute({
        merchant,
        totalAmount,
        mcc,
        accountId,
    }: IRequest): Promise<{ code: string }> {
        try {

            if (!accountId) {
                return { code: "07" }; // account id não informado
            }

            if (!totalAmount || totalAmount < 0) {
                return { code: "07" }; // valor da transação não informado ou negativo
            }

            if (!merchant) {
                return { code: "07" }; // merchant não informado
            }

            if (!mcc) {
                return { code: "07" }; // mcc não informado
            }

            const account = await this.accountsRepository.findByID(accountId);

            if (!account) {
                return { code: "07" }; // Conta não encontrada
            }

            // Buscar MCC baseado no nome do comerciante
            const merchantMcc = await this.merchantsRepository.findByName(
                merchant
            );
            const finalMcc = merchantMcc ? merchantMcc.mcc : mcc; // Prioriza MCC do comerciante, se existir

            // Determinar categorias com base nos MCCs
            const merchantCategory = getCategoryFromTransaction(finalMcc);
            
            const transactionCategory = getCategoryFromTransaction(mcc);

            // Tentar debitar da categoria do MCC do comerciante
            if (merchantCategory && account[merchantCategory] >= totalAmount) {
                account[merchantCategory] -= totalAmount;
            }
            // Tentar debitar da categoria do MCC do payload da transação
            else if (
                transactionCategory &&
                account[transactionCategory] >= totalAmount
            ) {
                account[transactionCategory] -= totalAmount;
            }
            // Fallback para CASH (última prioridade)
            else if (account.cashBalance >= totalAmount) {
                account.cashBalance -= totalAmount;
            }
            // Saldo insuficiente em todas as categorias
            else {
                return { code: "51" }; // Saldo insuficiente
            }

            // Atualizar saldos e registrar a transação
            await this.accountsRepository.update(account);

            await this.transactionsRepository.create({
                accountId,
                totalAmount,
                mcc: finalMcc,
                merchant,
            });

            return { code: "00" }; // Transação aprovada
        } catch (error) {
            console.error(error);
            return { code: "07" }; // Erro inesperado
        }
    }
}

export { CreateTransactionUseCase };
