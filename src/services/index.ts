import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
import { User } from '../../src/entities/user.entity';
import type { Response } from 'express';
import { handleError } from '../../src/lib/util';
import AppDataSource from '../../src/data-source';

@Injectable()
export class ProfileService extends BaseService<
  Profile,
  CreateProfileDto,
  UpdateProfileDto
> {
  constructor(@InjectRepository(Profile) repo: Repository<Profile>) {
    super(repo);
  }

  async create(
    dto: CreateProfileDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const password = this.get_random_password();

    return this.auth_signup({
      data: {
        name: `${dto?.firstName} ${dto?.middleName}`,
        email: dto?.email ?? '',
        password,
      },

      after_func: async ({ better_auth_id, tx }) => {
        await tx.update(
          User,
          { id: better_auth_id },
          {
            role: dto?.role,
          },
        );

        const entity = tx.getRepository(Profile).create({
          ...dto,
          better_auth_id,
        });

        return tx.getRepository(Profile).save(entity);
      },
      res,
      includePasswordInEmailTemplate: true,
    });
  }

  async update(id: string, dto: UpdateProfileDto): Promise<any> {
    try {
      if (!id) {
        throw new Error('Missing id for profile update.');
      }

      const profile = await this.repo.findOneBy({
        id: id,
      });

      if (!profile) {
        throw new Error('profile record not found.');
      }

      if (!profile.better_auth_id) {
        throw new Error('profile record has no better_auth_id.');
      }

      return await AppDataSource.transaction(async (tx) => {
        const profileRepo = tx.getRepository(Profile);
        const userRepo = tx.getRepository(User);

        await profileRepo.update({ id }, dto);

        if (dto.role !== undefined) {
          await userRepo.update(
            { id: profile.better_auth_id },
            {
              role: dto.role,
            },
          );
        }

        const updatedProfile = await profileRepo.findOne({
          where: { id },
        });

        if (!updatedProfile) {
          throw new Error('Failed to retrieve updated profile record.');
        }

        return updatedProfile;
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const profile = await this.repo.findOne({
        where: { id },
      });

      if (!profile) {
        throw new Error('Profile not found.');
      }

      if (!profile.better_auth_id) {
        throw new Error('Profile has no better_auth_id.');
      }

      return await AppDataSource.transaction(async (tx) => {
        const profileRepo = tx.getRepository(Profile);
        const userRepo = tx.getRepository(User);

        const result = await profileRepo.delete({
          id,
        });

        await userRepo.delete({
          id: profile.better_auth_id,
        });

        return result;
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async filterProfile(role: string): Promise<Profile[]> {
    return this.repo.find({
      where: { role },
      order: {
        createdAt: -1,
      },
    });
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
export class RoomService extends BaseService<
  Room,
  CreateRoomDto,
  UpdateRoomDto
> {
  constructor(@InjectRepository(Room) repo: Repository<Room>) {
    super(repo);
  }

  override async findAll(): Promise<Room[]> {
    const { entities, raw } = await this.repo
      .createQueryBuilder('room')
      .leftJoin(
        Department,
        'department',
        'department.id::text = room.departmentId',
      )
      .addSelect('department.name', 'department_name')
      .getRawAndEntities();

    return entities.map((room, index) => ({
      ...room,
      department: raw[index]?.department_name ?? null,
    }));
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
  constructor(
    @InjectRepository(MedicalDocument) repo: Repository<MedicalDocument>,
  ) {
    super(repo);
  }
}

@Injectable()
export class UtilService {
  constructor() {}
  async serverTime(): Promise<Date> {
    return new Date();
  }
}
