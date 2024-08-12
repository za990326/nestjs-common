export class CreateDraftDto {
  title: string; //  标题
  user?: string; // 作者
  state: string; // 分类
  labels?: string[]; // 标签
  created_at?: string; //  创建时间
}
