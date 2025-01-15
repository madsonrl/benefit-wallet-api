import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1638136475802 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",

                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "merchant", type: "varchar" },
                    { name: "totalAmount", type: "float" },
                    { name: "mcc", type: "varchar" },
                    { name: "accountId", type: "uuid", isNullable: true },
                    { name: "createdAt", type: "timestamp", default: "now()" },
                    { name: "updatedAt", type: "timestamp", default: "now()" },
                ],
                foreignKeys: [
                    {
                        name: "FKAccountTransaction",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["accountId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }
}
