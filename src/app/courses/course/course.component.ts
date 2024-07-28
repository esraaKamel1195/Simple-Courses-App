import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { concatMap, map, Observable, tap } from 'rxjs';
import { Course } from '../model/course';
import { CoursesHttpService } from '../services/courses-http.service';
import {
  createHttpObservable,
  createIndividualHttpObservable,
} from '../../common/util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { createHttpObservable } from '../../common/util';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit, AfterViewInit {
  loading$: Observable<boolean> | undefined;
  course$: Observable<Course> | undefined;
  lessons$: Observable<any> | undefined;

  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;
  courseId: number | string;
  @ViewChild('searchInput', { static: true, read: ElementRef })
  searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private coursesHttpService: CoursesHttpService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseUrl: string = String(
      this.activateRoute.snapshot.paramMap.get('courseUrl')
    );

    const courseId: string = String(
      this.activateRoute.snapshot.paramMap.get('id')
    );

    // this.course$ = this.coursesHttpService.findCourseByUrl(courseUrl);
    // this.lessons$ = this.course$.pipe(
    //   concatMap((course) => this.coursesHttpService.findLessons(course.id)),
    //   tap(console.log)
    // );

    this.course$ = createIndividualHttpObservable(
      `http://localhost:9000/api/courses/${courseUrl}`
    );

    this.lessons$ = createHttpObservable(
      `http://localhost:9000/api/lessons?courseId=${courseId}&pageSize=4`
    );

    // Implementing a Cancellable HTTP Observable
    // const http$ = createHttpObservable('http://localhost:9000/api/courses');
    // const sub = http$.subscribe();

    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 0);
  }

  ngAfterViewInit(): void {
    console.log(this.searchInput.nativeElement);
  }

  loadLessonsPage(course: Course) {}
}
