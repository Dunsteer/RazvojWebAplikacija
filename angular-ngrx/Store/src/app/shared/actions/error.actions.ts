import { Action } from '@ngrx/store'
import { Error } from '../models/error.model'

export const SET = '[ERROR] Set';
export const RESET = '[ERROR] Reset';


export class Set implements Action {
    readonly type = SET;

    constructor(public error: Error) { }
}

export class Reset implements Action {
    readonly type = RESET;
}

export type Actions = Set | Reset
