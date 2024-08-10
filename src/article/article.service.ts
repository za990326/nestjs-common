import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
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
        mas: '此标题文章已存在',
      };
    }
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
      msg: '创建成功',
      data: null,
    };
  }
  // 查询（标题，分类，标签，创建时间）
  async findAll(findArticleDto: FindArticleDto): Promise<any> {
    const {
      page = 1,
      pageSize = 10,
      title,
      state,
      labels,
      startTime,
      endTime,
    } = findArticleDto;
    const skip = (page - 1) * pageSize;
    // 整合全部查询和条件查询
    const whereClause: any = {};
    if (title) {
      // 模糊查询(contains)
      whereClause.title = { contains: title };
    }
    if (state) {
      whereClause.state = state;
    }
    if (labels && labels.length > 0) {
      whereClause.labels = { contains: labels };
    }

    if (startTime && endTime) {
      whereClause.created_at = {
        gte: startTime,
        lte: endTime,
      };
    }
    return await this.prisma.article.findMany({
      where: whereClause,
      skip,
      take: +pageSize,
    });
  }
  // 删除文章
  async remove(id: number) {
    await this.prisma.article.delete({
      where: {
        id,
      },
    });
    return {
      message: '删除成功',
    };
  }
  // 更新文章
  async update(id: number) {
    const article = await this.prisma.article.findFirst({
      where: {
        id,
      },
    });
    console.log(article);
    return '11';
  }
}
