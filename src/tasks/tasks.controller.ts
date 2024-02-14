import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
        @Get()
        getAllTasks(): Task[] {
           return this.tasksService.getallTasks();  
        } 
        // @Post()
        // createTask( @Body() body) {
        //     console.log('body', body.title)
            
        // }
        @Post()
        createTask( 
        @Body('title') title:string,
        @Body('description') description: string) : Task
         {
            return  this.tasksService.createTask(title, description)
        }
}
