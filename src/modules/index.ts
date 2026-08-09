import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Appointment,
  Department,
  Examination,
  MedicalDocument,
  Patient,
  Prescription,
  Room,
  TestRequest,
  User,
} from '../entities';
import {
  AppointmentResolver,
  DepartmentResolver,
  ExaminationResolver,
  MedicalDocumentResolver,
  PatientResolver,
  PrescriptionResolver,
  RoomResolver,
  TestRequestResolver,
  UserResolver,
  UtilResolver,
} from '../resolvers';
import {
  AppointmentService,
  DepartmentService,
  ExaminationService,
  MedicalDocumentService,
  PatientService,
  PrescriptionService,
  RoomService,
  TestRequestService,
  UserService,
  UtilService,
} from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UsersModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientResolver, PatientService],
})
export class PatientsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomResolver, RoomService],
})
export class RoomsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentResolver, AppointmentService],
})
export class AppointmentsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Examination])],
  providers: [ExaminationResolver, ExaminationService],
})
export class ExaminationsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([TestRequest])],
  providers: [TestRequestResolver, TestRequestService],
})
export class TestRequestsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Prescription])],
  providers: [PrescriptionResolver, PrescriptionService],
})
export class PrescriptionsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([MedicalDocument])],
  providers: [MedicalDocumentResolver, MedicalDocumentService],
})
export class MedicalDocumentsModule {}

@Module({
  imports: [],
  providers: [UtilResolver, UtilService],
})
export class UtilModule {}
