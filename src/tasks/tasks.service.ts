import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

 
@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getallTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string) :Task{
        const found =  this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException("Task with id not found");
        }
        return found;
    }
    getTaskWithFilters( filterDto : GetTaskFilterDto): Task[]{
        const {status, search} = filterDto;
        let tasks = this.getallTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search))
        };
        return tasks;
;    }

    deleteTaskById(id: string){
        const found =  this.getTaskById(id)
         return this.tasks  =  this.tasks.filter(item => item.id !== found.id);  
    } 
    updateTaskById(id: string, status : TaskStatus) : Task{
        const taskToBeUpdated = this.getTaskById(id);
        taskToBeUpdated.status = status;
        return  taskToBeUpdated; 
   } 

    createTask(createTaskDto :  CreateTaskDto) :Task{
        const {title, description} = createTaskDto
         const task: Task ={
            id : uuid(),
            title,
            description,
            status: TaskStatus.OPEN,  
         };
         this.tasks.push(task);
         return task;
    }
} 
