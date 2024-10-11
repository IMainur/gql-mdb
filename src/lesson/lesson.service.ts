import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository:Repository<Lesson>,
    ){}

    async getLessons():Promise<Lesson[]>{
        return await this.lessonRepository.find()
    }

    async getLesson(id:string): Promise<Lesson>{
        return await this.lessonRepository.findOneBy({ id })
    }

    async createLesson(
        createLessonInput:CreateLessonInput
    ):Promise<Lesson>{
        console.log(`db url: ${process.env.DB_URL}`)
        const {name,startDate,endDate,students} = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })

        const savedLesson =  await this.lessonRepository.save(lesson);
        console.log('saved lesson')
        console.log(savedLesson)
        return savedLesson
    }

    async assignStudentsToLesson(lessonId:string,studentIds: string[]):Promise<Lesson>{
        const lesson = await this.lessonRepository.findOneBy({id:lessonId})
        lesson.students = lesson.students? [...lesson.students,...studentIds] : [...studentIds]
        return await this.lessonRepository.save(lesson);
    }
}
