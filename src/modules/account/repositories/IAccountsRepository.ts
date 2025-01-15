import { Account } from "../infra/typeorm/entities/Account";
import { ICreateAccountDTO } from "../dtos/ICreateAccountDTO";

interface IAccountRepository {
    findByClientName(clientName: string): Promise<Account>;
    findByID(id: string): Promise<Account>;
    list(): Promise<Account[]>;
    create({
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<void>;
    update({
        id,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<Account>;
    delete(id: string): Promise<void>;
}

export { IAccountRepository };
