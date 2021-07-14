import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository : Repository<Student> 
  ){}

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find()
  }
  
  async getManyStudents(studentsIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentsIds
        }
      }
    })
  }

  async getOneStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id })
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput
    })

    return this.studentRepository.save(student)
  }
}
