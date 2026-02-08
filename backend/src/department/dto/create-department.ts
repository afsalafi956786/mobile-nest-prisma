import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateDepartmentDto {
  @ApiProperty({ example: 'IT' })
  @IsArray()
  @IsNotEmpty()
  departments: string[]

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