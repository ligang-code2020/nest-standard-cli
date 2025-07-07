import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsIdentifierRepeat } from '../rules/is-identifier-repeat';

// 这里记录一下多层数据结构应该怎么校验

class CatChildren {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;
}

class Spouse {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Type(() => Number)
  age: number;
}

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CatChildren)
  @IsIdentifierRepeat()
  catChildren: CatChildren[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Spouse)
  spouse: Spouse;
}
