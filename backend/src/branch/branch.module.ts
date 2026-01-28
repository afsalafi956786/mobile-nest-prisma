import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/common/common.module';

@Module({
  imports: [UsersModule,PrismaModule,SharedModule],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
