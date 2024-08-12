import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { FindDraftDto } from './dto/find-draft.dto';

@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftService.create(createDraftDto);
  }

  @Get()
  findAll(@Query() findDraftDto: FindDraftDto) {
    return this.draftService.findAll(findDraftDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftService.update(+id, updateDraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.draftService.remove(+id);
  }
}
