import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReturnTask, Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Todo } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
        @UseGuards(AuthGuard('jwt')) 
        @Get()
        getTasks(@Query(ValidationPipe) filterDto : GetTaskFilterDto){
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
            updateTaskById(@Param('id') id: string, @Body('status', TaskStatusValidationPipe)  status : TaskStatus  ) : Promise<Todo>{
                return this.tasksService.updateTaskById(id, status)   
        }
  
        // // @Post()
        // // createTask( @Body() body) {
        // //     console.log('body', body.title) 
            
        // // }
        @Post()
        @UsePipes(ValidationPipe)
        createTask( 
        @Body() createTaskDto : CreateTaskDto):  Promise<Todo>
         {
            return this.tasksService.createTask(createTaskDto)
        }
}
