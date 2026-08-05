import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../bases/base.service';
import {
  CreateAppointmentDto,
  CreateDepartmentDto,
  CreateExaminationDto,
  CreateMedicalDocumentDto,
  CreatePatientDto,
  CreatePrescriptionDto,
  CreateRoomDto,
  CreateTestRequestDto,
  CreateUserDto,
  UpdateAppointmentDto,
  UpdateDepartmentDto,
  UpdateExaminationDto,
  UpdateMedicalDocumentDto,
  UpdatePatientDto,
  UpdatePrescriptionDto,
  UpdateRoomDto,
  UpdateTestRequestDto,
  UpdateUserDto,
} from 'src/dtos';
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

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
}

@Injectable()
export class PatientService extends BaseService<
  Patient,
  CreatePatientDto,
  UpdatePatientDto
> {
  constructor(@InjectRepository(Patient) repo: Repository<Patient>) {
    super(repo);
  }
}

@Injectable()
export class DepartmentService extends BaseService<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor(@InjectRepository(Department) repo: Repository<Department>) {
    super(repo);
  }
}

@Injectable()
export class RoomService extends BaseService<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(@InjectRepository(Room) repo: Repository<Room>) {
    super(repo);
  }
}

@Injectable()
export class AppointmentService extends BaseService<
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto
> {
  constructor(@InjectRepository(Appointment) repo: Repository<Appointment>) {
    super(repo);
  }
}

@Injectable()
export class ExaminationService extends BaseService<
  Examination,
  CreateExaminationDto,
  UpdateExaminationDto
> {
  constructor(@InjectRepository(Examination) repo: Repository<Examination>) {
    super(repo);
  }
}

@Injectable()
export class TestRequestService extends BaseService<
  TestRequest,
  CreateTestRequestDto,
  UpdateTestRequestDto
> {
  constructor(@InjectRepository(TestRequest) repo: Repository<TestRequest>) {
    super(repo);
  }
}

@Injectable()
export class PrescriptionService extends BaseService<
  Prescription,
  CreatePrescriptionDto,
  UpdatePrescriptionDto
> {
  constructor(@InjectRepository(Prescription) repo: Repository<Prescription>) {
    super(repo);
  }
}

@Injectable()
export class MedicalDocumentService extends BaseService<
  MedicalDocument,
  CreateMedicalDocumentDto,
  UpdateMedicalDocumentDto
> {
  constructor(@InjectRepository(MedicalDocument) repo: Repository<MedicalDocument>) {
    super(repo);
  }
}
