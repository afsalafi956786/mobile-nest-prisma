import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, ArrayMinSize, IsInt, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreatePositionDto {
  @ApiProperty({ example: 'Software engineer' })
  @IsArray()
  @IsNotEmpty()
  positions: string[]


  @ApiProperty({example : 'IT'})
  @IsNumber()
  @IsNotEmpty()
  departmentId: number

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