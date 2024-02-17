import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, ReturnTask, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todo } from '@prisma/client';

 
@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}
    async getallTasks(){
        return await this.prisma.todo.findMany();
    }

    async getTaskById(id: string) :Promise<Todo>{
        const found =  await this.prisma.todo.findUnique({
            where: {
                id: id,
              },
          });
        if(!found){
            throw new NotFoundException("Task with id not found");
        }
        return found;
    }
    async getTaskWithFilters( filterDto : GetTaskFilterDto): Promise<Todo[]>{
        const {status, search} = filterDto;
        let tasks  = await this.getallTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search))
        };
        return tasks;
;    }

   async deleteTaskById(id: string){
        await this.prisma.todo.delete({
            where: {
              id: id,
            }, })
        return ("Deleted sucessfully")
    } 
    async updateTaskById(id: string, status : TaskStatus) : Promise<Todo>{
        const taskToBeUpdated = await this.getTaskById(id);
        taskToBeUpdated.status = status;
        return  taskToBeUpdated; 
   } 

    async createTask(createTaskDto :  CreateTaskDto): Promise<Todo>{
        const {title, description} = createTaskDto
         const task: Task ={
            title,
            description,
            status: TaskStatus.OPEN,
            userId: '820c7978-dfce-4423-be4b-1edb9c039044'
         };
         const data =  await this.prisma.todo.create({ data: task });
         return data;
    }
} 
