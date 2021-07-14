import { Args, Mutation, Query, Resolver, Parent} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from '../student/assing-students-to-lesson.input';
import { ResolveField } from '@nestjs/graphql';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
    ) {}

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

  @Mutation(returns => LessonType)
  assinStudentsToLesson(
    @Args('assingStudentsToLessonInput') assingStudentsToLessonInput: AssingStudentsToLessonInput
  ){
    return this.lessonService.assignStudentsToLesson(assingStudentsToLessonInput)
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log('lesson', lesson)
    return this.studentService.getManyStudents(lesson.students)
  }
}
