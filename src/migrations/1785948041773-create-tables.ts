import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1785948041773 implements MigrationInterface {
    name = 'CreateTables1785948041773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" character varying NOT NULL, "doctorId" character varying NOT NULL, "appointmentDate" TIMESTAMP NOT NULL, "reason" character varying, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "examination" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" character varying NOT NULL, "doctorId" character varying NOT NULL, "title" character varying NOT NULL, "departmentId" character varying NOT NULL, "symptoms" character varying, "diagnosis" character varying, "notes" character varying, "status" character varying NOT NULL, "followUpDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de7c2a81d379fdf37174356fc12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "gender" character varying, "dateOfBirth" TIMESTAMP, "profileImage" character varying, "email" character varying, "phone" character varying NOT NULL, "alternativePhone" character varying, "address" character varying, "role" character varying NOT NULL, "departmentId" character varying, "employeeId" character varying, "specialization" character varying, "education" character varying, "licenseNumber" character varying, "licenseExpiryDate" TIMESTAMP, "experienceYears" integer, "joiningDate" TIMESTAMP, "emergencyContactName" character varying, "emergencyContactPhone" character varying, "note" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardNumber" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "gender" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "phone" character varying NOT NULL, "address" character varying, "bloodGroup" character varying, "emergencyContactName" character varying, "emergencyContactPhone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departmentId" character varying NOT NULL, "capacity" integer, "status" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "examinationId" character varying NOT NULL, "testType" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL, "result" character varying, "technicianId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a2571f6f6d887db10e3d04b0056" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "examinationId" character varying NOT NULL, "doctorId" character varying NOT NULL, "patientId" character varying NOT NULL, "pharmacistId" character varying, "medicines" jsonb NOT NULL, "status" character varying NOT NULL, "note" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" character varying NOT NULL, "uploadedBy" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying, "fileUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd2e233a13beb574af8db3fa43e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "medical_document"`);
        await queryRunner.query(`DROP TABLE "prescription"`);
        await queryRunner.query(`DROP TABLE "test_request"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "examination"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
