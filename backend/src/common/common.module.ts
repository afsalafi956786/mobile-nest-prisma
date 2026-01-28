// shared.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHelper } from './service/user-helper';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserHelper],
  exports: [UserHelper], // now any module importing SharedModule can use it
})
export class SharedModule {}
