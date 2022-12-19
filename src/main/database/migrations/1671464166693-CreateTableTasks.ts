import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateTableTasks1671464166693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema("tasksBD", true);
    await queryRunner.createTable(
      new Table({
        schema: "tasksBD",
        name: "tasks",
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
            name: "title",
            type: "varchar",
            length: "100",
            isNullable: false,
          }),
          new TableColumn({
            name: "description",
            type: "varchar",
            length: "100",
            isNullable: false,
          }),
          new TableColumn({
            name: "archived",
            type: "boolean",
            isNullable: false,
            default: false,
          }),
          new TableColumn({
            name: "id_user",
            type: "uuid",
            isNullable: false,
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
