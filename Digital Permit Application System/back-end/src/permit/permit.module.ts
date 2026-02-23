import { Module } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Permit } from './permit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permit])],
  controllers: [PermitController],
  providers: [PermitService]
})
export class PermitModule {}
