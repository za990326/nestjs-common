export class CreateArticleDto {
  title: string; //  标题
  user?: string; // 作者
  state: string; // 分类
  labels?: string[]; // 标签
  created_at?: string; //  创建时间
  number?: number; // 排序 数字越大越靠前
  locked?: boolean; // 是否隐藏
  avatar?: string; // 文章图标
  close_at?: string; // 隐藏时间
}
