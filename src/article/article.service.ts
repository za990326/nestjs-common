import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    const { title, author, classification, tag, createTime, order, display } =
      createArticleDto;
    const article = await this.prisma.article.findFirst({
      where: {
        title,
      },
    });
    if (article) {
      return {
        code: 200,
        msg: '文章已存在',
      };
    }
    await this.prisma.article.create({
      data: {
        title,
        author,
        classification,
        tag,
        createTime: createTime ? createTime : new Date().toLocaleString(),
        order: order ? order : 0,
        display: display ? display : false,
      },
    });
    return 'This action adds a new article';
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

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
