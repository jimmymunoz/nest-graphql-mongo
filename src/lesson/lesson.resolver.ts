import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query((returns) => [LessonType])
  async lessons() {
    const lesson = await this.lessonService.getLessons();
    return lesson;
  }

  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string) {
    console.log('id', id);
    const lesson = await this.lessonService.getLesson(id);
    console.log('lesson', lesson);
    return lesson;
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
}
