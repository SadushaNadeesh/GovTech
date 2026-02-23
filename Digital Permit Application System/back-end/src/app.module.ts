import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Permit } from './permit/permit.entity';
import { PermitModule } from './permit/permit.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'permitDb',
      entities: [Permit],
      synchronize: true,
      logging: true,
    }), PermitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
