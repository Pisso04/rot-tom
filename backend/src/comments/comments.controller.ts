import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { count } from 'rxjs/internal/operators/count';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    console.log(createCommentDto);

 
      // Requiring ObjectId from mongoose npm package
    const ObjectId = require('mongoose').Types.ObjectId;

    // Validator function
    function isValidObjectId(id){
      
      if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
          return true;	
        return false;
      }
      return false;
    }

    // Loading testcases into array
    const testStrings = createCommentDto;

    // Validating each test case
    for(const testcase of testStrings){

      if(isValidObjectId(testcase))
        console.log(testcase + " is a valid MongodbID");
        if (count.testcase > 3 ){
          return this.commentsService.create(createCommentDto);
        else {
          return ('We need three element')
        }
          
        }
      else
        console.log(testcase + " is not a valid MongodbID");
        return console.log(testcase + " is not a valid MongodbID, put a correct value");

    }



    // const ObjectId = require('mongoose').Types.ObjectId;
    // function isValidObjectId(id){
    
    // if(ObjectId.isValid(id)){
    //     if((String)(new ObjectId(id)) === id)
    //         return true;
    //     return false;
    // }
    // return false;
    // }



    // return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
