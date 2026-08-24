import { Res } from '@nestjs/common';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import type { Response } from 'express';

type Type<T = any> = new (...args: any[]) => T;

export interface BaseService<TCreateDto = any, TUpdateDto = any> {
  create(dto: TCreateDto, res: Response): Promise<any>;
  findAll(): Promise<any[]>;
  findOne(id: string): Promise<any | null>;
  update(id: string, dto: TUpdateDto): Promise<any>;
  remove(id: string): Promise<any>;
}

export function BaseResolver<
  TEntity,
  TCreateDto = any,
  TUpdateDto = any,
  TService extends BaseService<TCreateDto, TUpdateDto> = BaseService<
    TCreateDto,
    TUpdateDto
  >,
>(
  entityType: Type<TEntity>,
  createInputType: Type<TCreateDto>,
  updateInputType: Type<TUpdateDto>,
  collectionName: string,
) {
  abstract class BaseResolverHost {
    constructor(public readonly service: TService) {}

    @Query(() => [entityType], { name: collectionName })
    async findAll() {
      return this.service.findAll();
    }

    @Query(() => entityType, { name: collectionName.slice(0, -1) })
    async findOne(@Args('id', { type: () => ID }) id: string) {
      const result = await this.service.findOne(id);

      if (!result) {
        throw new Error('Item not found');
      }

      return result;
    }

    @Mutation(() => entityType, { name: `create${entityType.name}` })
    async create(
      @Args('input', { type: () => createInputType }) dto: TCreateDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      return this.service.create(dto, res);
    }

    @Mutation(() => entityType, { name: `update${entityType.name}` })
    async update(
      @Args('id', { type: () => ID }) id: string,
      @Args('input', { type: () => updateInputType }) dto: TUpdateDto,
    ) {
      await this.service.update(id, dto);
      const result = await this.service.findOne(id);

      if (!result) {
        throw new Error('Item not found');
      }

      return result;
    }

    @Mutation(() => Boolean, { name: `remove${entityType.name}` })
    async remove(@Args('id', { type: () => ID }) id: string) {
      await this.service.remove(id);
      return true;
    }
  }

  return BaseResolverHost;
}
