import { Article } from './article';

export interface Order {
  id: string;
  articles:Article[]

}

export function createOrder(
  id: string = null, articles:Article[] = []
): Order {
  return {
    id,
    articles
  };
}
