import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permit, PermitStatus } from './permit.entity';
import { CreatePermitDto, UpdatePermitStatusDto } from './permit.dto';

@Injectable()
export class PermitService {
  constructor(
    @InjectRepository(Permit)
    private permitRepository: Repository<Permit>,
  ) {}

  async create(createPermitDto: CreatePermitDto): Promise<Permit> {
    const permit = this.permitRepository.create({
      ...createPermitDto,
      status: PermitStatus.SUBMITTED,
    });
    return this.permitRepository.save(permit);
  }

  async findOne(id: string): Promise<Permit> {
    const permit = await this.permitRepository.findOne({ where: { id } });
    if (!permit) {
      throw new NotFoundException(`Permit with ID ${id} not found`);
    }
    return permit;
  }

  async findAll(status?: PermitStatus): Promise<Permit[]> {
    const query = this.permitRepository.createQueryBuilder('permit');
    if (status) {
      query.where('permit.status = :status', { status });
    }
    return query.getMany();
  }

  async updateStatus(id: string, updatePermitStatusDto: UpdatePermitStatusDto): Promise<Permit> {
    const permit = await this.findOne(id);
    const oldStatus = permit.status;
    const newStatus = updatePermitStatusDto.status;

    // Validate status transitions
    if (!this.isValidTransition(oldStatus, newStatus)) {
      throw new BadRequestException(`Invalid status transition from ${oldStatus} to ${newStatus}`);
    }

    permit.status = newStatus;
    const updatedPermit = await this.permitRepository.save(permit);

    // Emit event (using console)
    // Can use an event emitter or message queue in a real application
    console.log('PermitStatusChanged', {
      permitId: id,
      oldStatus,
      newStatus,
      timestamp: new Date().toISOString(),
    });

    return updatedPermit;
  }

  private isValidTransition(oldStatus: PermitStatus, newStatus: PermitStatus): boolean {
    const validTransitions: Record<PermitStatus, PermitStatus[]> = {
      [PermitStatus.SUBMITTED]: [PermitStatus.UNDER_REVIEW],
      [PermitStatus.UNDER_REVIEW]: [PermitStatus.APPROVED, PermitStatus.REJECTED],
      [PermitStatus.APPROVED]: [],
      [PermitStatus.REJECTED]: [],
    };

    return validTransitions[oldStatus].includes(newStatus);
  }
}
