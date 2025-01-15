import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccounts1638136384801 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accounts",

                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "clientName", type: "varchar" },
                    { name: "foodBalance", type: "float" },
                    { name: "mealBalance", type: "float" },
                    { name: "cashBalance", type: "float" },
                    { name: "createdAt", type: "timestamp", default: "now()" },
                    { name: "updatedAt", type: "timestamp", default: "now()" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts");
    }
}
