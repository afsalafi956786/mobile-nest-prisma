import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { UserHelper } from 'src/common/service/user-helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Role } from 'src/users/user.types';
import { SuccessResponseDto } from 'src/common/service/common.types';
import { UpdateBranchDto } from './dto/update-branch.dto';


@Injectable()
export class BranchService {
  constructor(
    private readonly userHelperService: UserHelper ,
    private readonly prisma: PrismaService,
  ) {}

   async createBranch(
    dto: CreateBranchDto,
    userId: number,
  ): Promise<SuccessResponseDto> {

    const user = await this.userHelperService.getUserOrThrow(userId);

    if (user.role !== Role.Admin) {
      throw new ForbiddenException('Only admin can create branch');
    }

    const branchExists = await this.prisma.branch.findUnique({
      where: { name: dto.name },
    });

    if (branchExists) {
      throw new BadRequestException('Branch already exists');
    }

    await this.prisma.branch.create({
      data: {
        ...dto,
        adminId: user.id,
      },
    });

    return {
      success: true,
      message: 'Branch created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async updateBranch(
    branchId: number,
    dto: UpdateBranchDto,
    userId: number,
  ): Promise<SuccessResponseDto> {

    const user  =await this.userHelperService.getUserOrThrow(userId);

       if (user.role !== Role.Admin) {
      throw new ForbiddenException('Only admin can update branch');
    }

    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });

       if (!branch) {
      throw new BadRequestException('Branch not found');
    }

      if (dto.name && dto.name !== branch.name) {
    const exists = await this.prisma.branch.findUnique({
      where: { name: dto.name },
    });

    if (exists) {
      throw new BadRequestException('Branch name already exists');
    }
  }

    await this.prisma.branch.update({
    where: { id: branchId },
    data: dto,
  });

    return {
    success: true,
    message: 'Branch updated successfully',
    statusCode: HttpStatus.OK,
  };

  }


}
