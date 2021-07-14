import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    const item = await this.lessonRepository.findOne({ _id: id });
    console.log('item', item);
    return item;
  }

  async createLesson(name, starDate, endDate): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      starDate,
      endDate,
    });

    return this.lessonRepository.save(lesson);
  }
}
