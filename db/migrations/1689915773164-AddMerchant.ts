import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMerchant1689915773164 implements MigrationInterface {
    name = 'AddMerchant1689915773164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "merchant" ("id" SERIAL NOT NULL, "product" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "hint" character varying NOT NULL, CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "merchant"`);
    }

}
