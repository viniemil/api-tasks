import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
import { idText } from "typescript";

export class CreateTableUsers1671455936115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema("tasksBD", true);
    await queryRunner.createTable(
      new Table({
        schema: "tasksBD",
        name: "users",
        columns: [
          new TableColumn({
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          }),
          new TableColumn({
            name: "updated_at",
            type: "date",
            isNullable: false,
          }),
          new TableColumn({
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          }),
          new TableColumn({
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          }),
          new TableColumn({
            name: "password",
            type: "varchar",
            length: "100",
            isNullable: false,
          }),
          new TableColumn({
            name: "email",
            type: "varchar",
            length: "100",
            isNullable: false,
          }),
          new TableColumn({
            name: "age",
            type: "numeric",
            length: "3",
            isNullable: false,
          }),
          new TableColumn({
            name: "cpf",
            type: "varchar",
            length: "11",
            isNullable: false,
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
