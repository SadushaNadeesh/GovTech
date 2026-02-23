import { Controller, Get, Post, Patch, Param, Query, Body } from '@nestjs/common';
import { PermitService } from './permit.service';
import { CreatePermitDto, UpdatePermitStatusDto } from './permit.dto';
import { PermitStatus } from './permit.entity';

@Controller('api/permits')
export class PermitController {
  constructor(private readonly permitService: PermitService) {}

  @Post()
  create(@Body() createPermitDto: CreatePermitDto) {
    return this.permitService.create(createPermitDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permitService.findOne(id);
  }

  @Get()
  findAll(@Query('status') status?: PermitStatus) {
    return this.permitService.findAll(status);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updatePermitStatusDto: UpdatePermitStatusDto) {
    return this.permitService.updateStatus(id, updatePermitStatusDto);
  }
}
