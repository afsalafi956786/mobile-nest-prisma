import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { SharedModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OptionalIntPipe } from 'src/common/pipes/optional-int.pipe';

@Module({
  imports: [SharedModule,PrismaModule],
  controllers: [PositionController],
  providers: [PositionService,OptionalIntPipe],
})
export class PositionModule {}
