export interface Task{
    title: string;
    description: string;
    status : TaskStatus;
    userId: string;
}
export interface ReturnTask{
    id: string;
    title: string;
    description: string;
    status : TaskStatus;
}


export enum TaskStatus{
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}