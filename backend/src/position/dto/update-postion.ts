import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, IsOptional, IsNumber, IsString } from "class-validator";

export class UpdatePositionDto {
  @ApiProperty({ example: 'Software engineer' })
  @IsString()
  @IsNotEmpty()
  pos_name: string


  @ApiProperty({example : 'IT'})
  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @ApiProperty({example : '2'})
  @IsNumber()
  @IsOptional()
  branchId: number
}