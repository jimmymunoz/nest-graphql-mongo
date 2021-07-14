import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from '../student/assing-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    const items = await this.lessonRepository.find();
    return items;
  }

  async getLesson(id: string): Promise<Lesson> {
    const item = await this.lessonRepository.findOne({ id: id });
    console.log('item', item);
    return item;
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(assingStudentsToLessonInput: AssingStudentsToLessonInput): Promise<Lesson> {
    const { lessonId, studentIds } = assingStudentsToLessonInput
    const lesson = await this.lessonRepository.findOne({id: lessonId})
    lesson.students = Array.isArray(lesson.students) ? [...lesson.students, ...studentIds] : [...studentIds]
    return this.lessonRepository.save(lesson)
  }
}
