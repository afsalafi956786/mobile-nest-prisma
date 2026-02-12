import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UserHelper } from 'src/common/service/user-helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position';
import { SuccessResponseDto } from 'src/common/service/common.types';
import { Role } from 'src/users/user.types';

@Injectable()
export class PositionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userHelper: UserHelper
    ) {}


    async createPosition(
        dto: CreatePositionDto,
        userId: number,
    ): Promise<SuccessResponseDto> {

        const user = await this.userHelper.getUserOrThrow(userId);

        let branchIds: number[] = [];

        const department = await this.prisma.department.findUnique({
          where: { id: dto.departmentId },
           include: { branches: true },
        })

        if (!department) {
          throw new BadRequestException('Department not found');
        }

           //  If branchIds provided → validate & use
           if (dto.branchIds && dto.branchIds.length > 0) {
             const count = await this.prisma.branch.count({
               where: { id: { in: dto.branchIds } },
             });
       
             if (count !== dto.branchIds.length) {
               throw new BadRequestException('Invalid branchIds provided');
             }
       
             branchIds = dto.branchIds;
             //auto assign based on role
           } else {
             if (user.role === Role.Admin) {
               const branches = await this.prisma.branch.findMany({
                 where: {
                  adminId: user.id,
                 },
                 select: { id: true },
               });
       
               branchIds = branches.map((b) => b.id);
             } else if (user.role === Role.user) {
               if (!user.branchId) {
                 throw new BadRequestException('User is not assigned to any branch');
               }
       
               branchIds = [user.branchId];
             }
           }
       
           if (branchIds.length === 0) {
             throw new BadRequestException('No branches available to assign');
           }
       
            const uniquePositions = [...new Set(dto.positions)];
       
           // check duplicate department inside same branches
           const existing = await this.prisma.position.findMany({
             where: {
               pos_name:  { in: uniquePositions },
               departmentId: dto.departmentId,
               branches: {
                 some: {
                   id: { in: branchIds },
                 },
               },
             },
             select: { pos_name: true },
           });
       
           if (existing.length > 0) {
           const names = existing.map((d) => d.pos_name).join(', ');
           throw new BadRequestException(
             `Position ${names} already exist in selected branches!`,
           );
           }
       
           // Create multiple departments (transaction)
         await this.prisma.$transaction(
           uniquePositions.map((name) =>
             this.prisma.position.create({
               data: {
                 pos_name: name,
                 departmentId: dto.departmentId,
                 branches: {
                   connect: branchIds.map((id) => ({ id })),
                 },
               },
             }),
           ),
         );
       
           return {
             success: true,
             message: 'Position created successfully',
             statusCode: HttpStatus.CREATED,
           };
        

    }


}
