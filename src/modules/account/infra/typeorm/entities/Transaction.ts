import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Account } from "./Account";

@Entity("transactions")
export class Transaction {
    @PrimaryColumn()
    id?: string;

    @Column()
    merchant: string;

    @Column()
    totalAmount: number;

    @Column()
    mcc: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: "accountId" })
    account: Account;

    @Column()
    accountId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

