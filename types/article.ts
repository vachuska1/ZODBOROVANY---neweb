export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  imageUrl?: string;
  isPublished?: boolean;
}
