import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMerchants1638136384801 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "merchants",

                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "merchantRegister", type: "varchar" },
                    { name: "mcc", type: "varchar" },
                    { name: "createdAt", type: "timestamp", default: "now()" },
                    { name: "updatedAt", type: "timestamp", default: "now()" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("merchants");
    }
}
