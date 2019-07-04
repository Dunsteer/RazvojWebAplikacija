import { Article } from './article';

export interface Order {
  id?: number;
  articles: Article[]

  userId: number;
  delivered:boolean;
}

export function createOrder(
  id: number = null, articles: Article[] = [], userId: number = null,delivered:boolean =false
): Order {
  return {
    id,
    articles,
    userId,
    delivered
  };
}
