import { isNullOrUndefined } from 'util';
import { OrderFilter } from './order.filter';
import { Order } from './order';

export const filterBy = (filter: OrderFilter) => (Order: Order): boolean => {
    return true;
};

export function filterData(data: Order[], filter: OrderFilter): Order[] {
  return data
    .filter(filterBy(filter));
}
