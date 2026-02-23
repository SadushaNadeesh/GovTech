import { IsString, IsEnum } from 'class-validator';
import { PermitStatus } from './permit.entity';

export class CreatePermitDto {
  @IsString()
  citizenId: string;

  @IsString()
  businessName: string;

  @IsString()
  permitType: string;
}

export class UpdatePermitStatusDto {
  @IsEnum(PermitStatus)
  status: PermitStatus;
}