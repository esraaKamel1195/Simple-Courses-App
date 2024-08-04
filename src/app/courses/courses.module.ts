import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCourse from './reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCourse.courseFeatureKey, fromCourse.reducers, { metaReducers: fromCourse.metaReducers })
  ]
})
export class CoursesModule { }
