import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { CreateStudentInput } from "./student.input";
import { StudentService } from "./student.service";







@Resolver( of => StudentType)
export class StudentResolver{

    constructor(
        private studentService:StudentService
    ){}

    @Query(returns => [StudentType])
    async getStudents(
        
    ){
        const students = await this.studentService.getStudents()
        return students;
    }

    @Query(returns => StudentType)
    async getStudent(
        @Args('id') id:string,
    ){
        const student = await this.studentService.getStudentWithId(id)
        return student;
    }


    @Mutation(returns => StudentType)
    async createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ){
        const student = await this.studentService.createStudent(createStudentInput)
        return student;
    }
}