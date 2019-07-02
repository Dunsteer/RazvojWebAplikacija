import { Article } from './article';

export interface Order {
  id?: number;
  articles: Article[]

  userId: number;
}

export function createOrder(
  id: number = null, articles: Article[] = [], userId: number = null
): Order {
  return {
    id,
    articles,
    userId
  };
}
