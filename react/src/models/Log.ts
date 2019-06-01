
export enum LogType{
    Start=0,
    Pause,
    Return,
    End
}

export interface Log{
    timestamp:Date;
    type:LogType;
}