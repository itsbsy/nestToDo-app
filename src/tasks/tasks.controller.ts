import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
        @Get()
        getTasks(@Query() filterDto : GetTaskFilterDto): Task[] {
            if(Object.keys(filterDto).length){
                return this.tasksService.getTaskWithFilters(filterDto);
            }
           return this.tasksService.getallTasks();  
        } 

        @Get('/:id') 
            getTaskById(@Param('id') id: string) {
                return this.tasksService.getTaskById(id)
             
        }
        @Delete('delete/:id') 
            deleteTaskById(@Param('id') id: string) {
                return this.tasksService.deleteTaskById(id)   
        }
        @Patch('update/:id/status') 
            updateTaskById(@Param('id') id: string, @Body('status') status : TaskStatus  ) : Task{
                return this.tasksService.updateTaskById(id, status)   
        }
  
        // @Post()
        // createTask( @Body() body) {
        //     console.log('body', body.title) 
            
        // }
        @Post()
        createTask( 
        @Body() createTaskDto : CreateTaskDto) : Task
         {
            return  this.tasksService.createTask(createTaskDto)
        }
}
