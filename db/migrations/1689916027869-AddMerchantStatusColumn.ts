import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMerchantStatusColumn1689916027869 implements MigrationInterface {
    name = 'AddMerchantStatusColumn1689916027869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ADD "status" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP COLUMN "status"`);
    }

}
