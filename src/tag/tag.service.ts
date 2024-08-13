import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  async create(createTagDto: CreateTagDto) {
    return await this.prisma.article_label.create({
      data: {
        title: createTagDto.title,
      },
    });
  }

  async findAll() {
    return await this.prisma.article_label.findMany();
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.prisma.article_label.update({
      where: { id },
      data: updateTagDto,
    });
    return {
      msg: '修改成功',
    };
  }

  async remove(id: number) {
    await this.prisma.article_label.delete({
      where: { id },
    });
    return {
      msg: '删除成功',
    };
  }
}
