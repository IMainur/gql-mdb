import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, MongoRepository, Repository } from 'typeorm';
import { CreateStudentInput } from './student.input';
import {v4 as uuid } from 'uuid'


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: MongoRepository<Student>,
    ){}

    async getStudents():Promise<Student[]>{
        const student = await this.studentRepository.find()
        return student
    }

    async getStudentWithId(id:string):Promise<Student>{
        const student = await this.studentRepository.findOneBy({id})
        return student
    }

    async createStudent(createStudentInput:CreateStudentInput):Promise<Student>{
        const {firstName,lastName} = createStudentInput
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
            // lessons:[],
        })

        return  await this.studentRepository.save(student)
    }

    async getManyStudents(studentIds:string[]):Promise<Student[]>{
        console.log(`in get Many Students`)
        const students = await this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                },
            }
        })
        // const students = [];
        // for(let i=0;i<studentIds.length;i++){
        //     console.log(studentIds[i])
        //     const tempSt = await this.studentRepository.findOneBy({id:studentIds[i]})
        //     if(tempSt){
        //         students.push(tempSt)
        //     }
        // }
        console.log(students)
        console.log('returning from getManyStudents')
        return students
    }
}
