import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("merchants")
export class Merchant {
    @PrimaryColumn()
    id?: string;

    @Column()
    merchantRegister: string;

    @Column()
    mcc: string;

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

