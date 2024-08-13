import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.article_class.findFirst({
      where: { title: createCategoryDto.title },
    });
    if (category) {
      return {
        mag: '该分类已存在',
      };
    }
    return await this.prisma.article_class.create({
      data: {
        title: createCategoryDto.title,
      },
    });
  }

  async findAll() {
    const categories = await this.prisma.article_class.findMany({
      select: { id: true, title: true },
    });
    return {
      data: categories,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.article_class.update({
      where: { id },
      data: updateCategoryDto,
    });
    return {
      msg: '更新成功',
      data: category,
    };
  }

  async remove(id: number) {
    await this.prisma.article_class.delete({
      where: { id },
    });
    return {
      msg: '删除成功',
    };
  }
}
