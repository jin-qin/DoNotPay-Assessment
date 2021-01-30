export enum TaskType {
    Unknown = 1,
    Pending,
    Inprogress,
    Completed,
}

export interface TaskData {
    id: number,
    taskType: TaskType,
    title: string,
    body: string
}

export interface Position {
    height: number,
    top: number
}