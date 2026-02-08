import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, IsInt, IsOptional, isNumber, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class UpdateDepartmentDto {


  @ApiProperty({ example: 'IT' })
  @IsString()
  @IsNotEmpty()
  dept_name: string

  @ApiProperty({ 
    example: [1, 2, 3], 
    description: 'Array of branch IDs',
    type: [Number] 
  })

   @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  branchIds: number[];
}