import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/users/user.types';

@Injectable()
export class UserHelper {
  constructor(private readonly prisma: PrismaService) {}

  async getUserOrThrow(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });



    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async userBranchIs (user: User, branchId?: number) {
   
    if(branchId){
      return [branchId];
    };

    //  Admin → all admin branches

    if(user.role === Role.Admin){
      const branches = await this.prisma.branch.findMany({
        where:{ adminId : user.id},
        select: {id: true}
      })

     return branches.map(b => b.id);
    }

    if(user.role === Role.user){
      if (!user.branchId) {
      throw new BadRequestException('User not assigned to any branch');
    }

    return [user.branchId];
    }

      throw new ForbiddenException('Invalid role');

  }


async resolveBranchId(
  user: User,
  branchId?: number,
): Promise<number> {

  // If branchId provided → validate
  if (branchId) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });

    if (!branch) {
      throw new BadRequestException('Invalid branchId provided');
    }

    return branchId;
  }

  // Auto assign
  if (user.role === Role.Admin) {
    const branch = await this.prisma.branch.findFirst({
      where: { adminId: user.id },
      select: { id: true },
    });

    if (!branch) {
      throw new BadRequestException('Admin has no branch');
    }

    return branch.id;
  }

  if (user.role === Role.user) {
    if (!user.branchId) {
      throw new BadRequestException(
        'User is not assigned to any branch',
      );
    }

    return user.branchId;
  }

  throw new BadRequestException('Branch not available');
}





  


}
