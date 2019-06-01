import {Log} from "./Log";

export interface User{
    id?:number;
    username:string;
    password:string;
    logs? : Log[];
    admin:boolean;
}