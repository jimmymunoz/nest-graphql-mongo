import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'qsdsqd1256',
      name: 'Physisc Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
