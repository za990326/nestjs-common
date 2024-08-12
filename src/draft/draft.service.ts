import { Injectable } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindDraftDto } from './dto/find-draft.dto';

@Injectable()
export class DraftService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDraftDto: CreateDraftDto) {
    const { title, user, state, labels, created_at } = createDraftDto;
    const draft = await this.prisma.draft.findFirst({
      where: {
        title,
      },
    });
    if (draft) {
      return {
        msg: '该文章已存在',
        data: draft,
      };
    }
    await this.prisma.draft.create({
      data: {
        title,
        user,
        state,
        labels: labels ? (labels.join(',') as string) : '',
        created_at: created_at ? created_at : new Date().toISOString(),
      },
    });
    return {
      msg: '创建成功',
      data: null,
    };
  }

  // 查询（标题，分类，标签，创建时间）
  async findAll(findDraftDto: FindDraftDto): Promise<any> {
    const {
      page = 1,
      pageSize = 10,
      title,
      state,
      labels,
      startTime,
      endTime,
    } = findDraftDto;
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
    // 查询总数
    const total = await this.prisma.draft.count({
      where: whereClause,
    });
    // 查询数据
    const drafts = await this.prisma.draft.findMany({
      skip,
      take: +pageSize,
      where: whereClause,
    });
    return {
      data: drafts,
      total,
    };
  }
  // 编辑草稿信息
  update(id: number, updateDraftDto: UpdateDraftDto) {
    return `This action updates a #${id} draft`;
  }
  // 删除草稿
  async remove(id: number) {
    await this.prisma.draft.delete({
      where: {
        id,
      },
    });
    return {
      msg: '删除成功',
    };
  }
}
