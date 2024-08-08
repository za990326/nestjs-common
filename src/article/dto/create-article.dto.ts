export class CreateArticleDto {
  title: string; //  标题
  author?: string; // 作者
  classification: string; // 分类
  tag?: string[]; // 标签
  createTime?: string; //  创建时间
  order?: number; // 排序
  display?: boolean; // 是否隐藏
}
