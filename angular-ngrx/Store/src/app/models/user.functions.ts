import { isNullOrUndefined } from 'util';
import { UserFilter } from './user.filter';
import { User } from './user';

export const filterUserBy = (filter: UserFilter) => (User: User): boolean => {
  if (filter.username === null) return true;

  if (User.username.startsWith(filter.username)) {
    return true;
  }
};

export function filterData(data: User[], filter: UserFilter): User[] {
  return data
    .filter(filterUserBy(filter));
}
