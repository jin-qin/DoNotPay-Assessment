import { TaskType } from '../common/types';
import test_text from '../assets/data/test_text.json';

export function getTaskStatusColor(taskType: TaskType) {
    return  taskType === TaskType.Pending ? '#ffab3c' : 
            taskType === TaskType.Inprogress ? '#43a4ff' : '#51cf94';
}

export function getTaskStatusTitle(taskType: TaskType) {
    return  taskType === TaskType.Pending ? 'Pending Task' : 
            taskType === TaskType.Inprogress ? 'In Progress' : 'Completed';
}

export function genRandomText(n: number) {
    const len = test_text.lorem_ipsum.length;
    const startIdx = Math.floor(Math.random() * (len - n));

    return test_text.lorem_ipsum.slice(startIdx, startIdx + n);
}

export function genRandomTitle() {
    return genRandomText(20);
}

export function genRandomBody() {
    return genRandomText(100);
}