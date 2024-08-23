import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCourse from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './course.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCourse.courseFeatureKey, fromCourse.coursesReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
})
export class CoursesModule {}
