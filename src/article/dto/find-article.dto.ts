export class FindArticleDto {
  title?: string;
  state?: string;
  labels?: string;
  startTime?: string; //ISO格式
  endTime?: string;
  page: number;
  pageSize: number;
}
