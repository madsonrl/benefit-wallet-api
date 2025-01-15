import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("accounts")
export class Account {
    @PrimaryColumn()
    id?: string;

    @Column()
    clientName: string;

    @Column()
    foodBalance: number;

    @Column()
    mealBalance: number;

    @Column()
    cashBalance: number;

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
        if (!this.foodBalance) {
            this.foodBalance = 0;
        }
        if (!this.mealBalance) {
            this.mealBalance = 0;
        }
        if (!this.cashBalance) {
            this.cashBalance = 0;
        }
    }
}

