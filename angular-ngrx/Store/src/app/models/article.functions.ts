import { isNullOrUndefined } from 'util';
import { ArticleFilter } from './article.filter';
import { Article } from './article';

export const filterBy = (filter: ArticleFilter) => (article: Article): boolean => {
  if (filter.name === null) return true;

  if (article.name.startsWith(filter.name)) {
    return true;
  }
};

export function filterData(data: Article[], filter: ArticleFilter): Article[] {
  return data
    .filter(filterBy(filter));
}
