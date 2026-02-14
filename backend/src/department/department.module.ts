import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { SharedModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OptionalIntPipe } from 'src/common/pipes/optional-int.pipe';

@Module({
  imports:[SharedModule,PrismaModule],
  controllers: [DepartmentController],
  providers: [DepartmentService,OptionalIntPipe],
})
export class DepartmentModule {}
