import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { Lesson } from "./lesson.entity";
import { AssignStudentInput, CreateLessonInput } from "./lesson.input";
import { StudentService } from "src/student/student.service";


@Resolver( of => LessonType )
export class LessonResolver{
    constructor(
        private lessonService:LessonService,
        private studentService:StudentService,
    ){}

/*     @Query(returns => LessonType)
    async lesson(
        @Args('id') id:string,
    ){
        return await this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    async createLesson(
        @Args('name') name:string,
        @Args('startDate') startDate:string,
        @Args('endDate') endDate:string,
    ){
        const result = await this.lessonService.createLesson(name,startDate,endDate)
        console.log(result)
        return result
    } */

    @Query(returns => LessonType)
    async lesson(
        @Args('id') id:string,
    ){
        return await this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    async lessons(){
        return await this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    async createLesson(
        @Args('createLessonInput') createLessonInput:CreateLessonInput
    ){
        const result = await this.lessonService.createLesson(createLessonInput)
        console.log(result)
        return result
    }

    @Mutation(returns => LessonType)
    async assignStudentsToLesson(
        @Args('assignStudentInput') assignStudentInput:AssignStudentInput
    ){
        const {lessonId,studentIds} = assignStudentInput
        return await this.lessonService.assignStudentsToLesson(lessonId,studentIds)
    }

    @ResolveField()
    async students(@Parent() lesson:Lesson){
        console.log(lesson);
        console.log(`lesson.students`)
        console.log(lesson.students)
        return await this.studentService.getManyStudents(lesson.students)
    }
}