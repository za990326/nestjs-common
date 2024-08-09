import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    const {
      title,
      user,
      state,
      labels,
      created_at,
      number,
      locked,
      avatar,
      close_at,
    } = createArticleDto;
    const article = await this.prisma.article.findFirst({
      where: {
        title,
      },
    });
    if (article) {
      return {
        data: '文章已存在',
      };
    }
    console.log(Array.from(labels));
    await this.prisma.article.create({
      data: {
        title,
        user,
        state,
        labels: labels ? (labels.join(',') as string) : '',
        created_at: created_at ? created_at : new Date().toISOString(),
        number: number ? number : 0,
        locked: locked ? locked : false,
        avatar: avatar
          ? avatar
          : 'https://cdn.jsdelivr.net/gh/h-1000/image@master/2021/09/16',
        close_at: close_at ? close_at : '2021-09-30T16:00:00.000Z',
      },
    });
    return {
      data: {
        message: '创建成功',
        data: null,
      },
    };
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    await this.prisma.article.delete({
      where: {
        id,
      },
    });
    return {
      message: '删除成功',
      data: null,
    };
  }
}
