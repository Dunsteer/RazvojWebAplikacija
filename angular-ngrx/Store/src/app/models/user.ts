import { Order } from './order';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  admin?: boolean;
  orders?: Order[];
  cart?:Order[];
}

export function createUser(
  id: number = 0, username: string = '', password: string = '', admin: boolean=false, orders: Order[] =[],cart:Order[] = []
): User {
  return {
    id,
    username,
    password,
    admin,
    orders,
    cart
  };
}
