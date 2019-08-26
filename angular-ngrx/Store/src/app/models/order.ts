import { Article } from './article';
import { User } from './user';

export interface Order {
  id?: number;
  articles: Article[]

  userId: number;
  delivered:boolean;
  user?: User;
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
