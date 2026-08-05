import { ObjectLiteral, Repository, DeepPartial, UpdateResult, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<
  Entity extends ObjectLiteral,
  CreateDto extends DeepPartial<Entity> = DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity> = QueryDeepPartialEntity<Entity>,
> {
  constructor(protected readonly repo: Repository<Entity>) {}

  create(dto: CreateDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id } as any);
  }

  update(id: number, dto: UpdateDto):Promise<UpdateResult>  {
    return this.repo.update(id, dto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
