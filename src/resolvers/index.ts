import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../bases/base.resolver';
import {
  Appointment,
  Department,
  Examination,
  MedicalDocument,
  Patient,
  Prescription,
  Room,
  TestRequest,
  Profile,
} from '../entities';
import {
  AppointmentService,
  DepartmentService,
  ExaminationService,
  MedicalDocumentService,
  PatientService,
  PrescriptionService,
  RoomService,
  TestRequestService,
  ProfileService,
  UtilService,
} from '../services';
import {
  CreateAppointmentDto,
  CreateDepartmentDto,
  CreateExaminationDto,
  CreateMedicalDocumentDto,
  CreatePatientDto,
  CreatePrescriptionDto,
  CreateRoomDto,
  CreateTestRequestDto,
  CreateProfileDto,
  UpdateAppointmentDto,
  UpdateDepartmentDto,
  UpdateExaminationDto,
  UpdateMedicalDocumentDto,
  UpdatePatientDto,
  UpdatePrescriptionDto,
  UpdateRoomDto,
  UpdateTestRequestDto,
  UpdateProfileDto,
} from '../../src/dtos';

@Resolver(() => Profile)
export class ProfileResolver extends BaseResolver<
  Profile,
  CreateProfileDto,
  UpdateProfileDto,
  ProfileService
>(Profile, CreateProfileDto, UpdateProfileDto, 'profiles') {
  constructor(service: ProfileService) {
    super(service);
  }

  @Query(() => [Profile], { name: 'filterProfile' })
  async filterProfile(@Args('role') role: string) {
    return this.service.filterProfile(role);
  }
}

@Resolver(() => Patient)
export class PatientResolver extends BaseResolver<
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
  PatientService
>(Patient, CreatePatientDto, UpdatePatientDto, 'patients') {
  constructor(service: PatientService) {
    super(service);
  }
}

@Resolver(() => Department)
export class DepartmentResolver extends BaseResolver<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DepartmentService
>(Department, CreateDepartmentDto, UpdateDepartmentDto, 'departments') {
  constructor(service: DepartmentService) {
    super(service);
  }
}

@Resolver(() => Room)
export class RoomResolver extends BaseResolver<
  Room,
  CreateRoomDto,
  UpdateRoomDto,
  RoomService
>(Room, CreateRoomDto, UpdateRoomDto, 'rooms') {
  constructor(service: RoomService) {
    super(service);
  }
}

@Resolver(() => Appointment)
export class AppointmentResolver extends BaseResolver<
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentService
>(Appointment, CreateAppointmentDto, UpdateAppointmentDto, 'appointments') {
  constructor(service: AppointmentService) {
    super(service);
  }
}

@Resolver(() => Examination)
export class ExaminationResolver extends BaseResolver<
  Examination,
  CreateExaminationDto,
  UpdateExaminationDto,
  ExaminationService
>(Examination, CreateExaminationDto, UpdateExaminationDto, 'examinations') {
  constructor(service: ExaminationService) {
    super(service);
  }
}

@Resolver(() => TestRequest)
export class TestRequestResolver extends BaseResolver<
  TestRequest,
  CreateTestRequestDto,
  UpdateTestRequestDto,
  TestRequestService
>(TestRequest, CreateTestRequestDto, UpdateTestRequestDto, 'testRequests') {
  constructor(service: TestRequestService) {
    super(service);
  }
}

@Resolver(() => Prescription)
export class PrescriptionResolver extends BaseResolver<
  Prescription,
  CreatePrescriptionDto,
  UpdatePrescriptionDto,
  PrescriptionService
>(Prescription, CreatePrescriptionDto, UpdatePrescriptionDto, 'prescriptions') {
  constructor(service: PrescriptionService) {
    super(service);
  }
}

@Resolver(() => MedicalDocument)
export class MedicalDocumentResolver extends BaseResolver<
  MedicalDocument,
  CreateMedicalDocumentDto,
  UpdateMedicalDocumentDto,
  MedicalDocumentService
>(
  MedicalDocument,
  CreateMedicalDocumentDto,
  UpdateMedicalDocumentDto,
  'medicalDocuments',
) {
  constructor(service: MedicalDocumentService) {
    super(service);
  }
}

@Resolver()
export class UtilResolver {
  constructor(private readonly service: UtilService) {}

  @Query(() => GraphQLISODateTime, { name: 'serverTime' })
  async serverTime(): Promise<Date> {
    return this.service.serverTime();
  }
}
