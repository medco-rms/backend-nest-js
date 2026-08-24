import {
  ObjectLiteral,
  Repository,
  DeepPartial,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AuthService } from './auth.service';
import { Res } from '@nestjs/common';
import type { Response } from 'express';

export abstract class BaseService<
  Entity extends ObjectLiteral,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity> =
    QueryDeepPartialEntity<Entity>,
> extends AuthService {
  constructor(protected readonly repo: Repository<Entity>) {
    super();
  }

  create(dto: CreateDto, @Res({ passthrough: true }) res: Response) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id } as any);
  }

  update(id: string, dto: UpdateDto): Promise<UpdateResult> {
    return this.repo.update(id, dto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
