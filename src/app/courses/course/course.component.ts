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
import {
  concat,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  interval,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
  throttle,
  throttleTime,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Course } from '../model/course';
import { CoursesHttpService } from '../services/courses-http.service';
import {
  createHttpObservable,
  createIndividualHttpObservable,
} from '../../common/util';

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
  loading$: Observable<boolean>;
  course$: Observable<Course>;
  lessons$: Observable<any>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;
  courseId: number | string;
  @ViewChild('searchInput', { static: true, read: ElementRef })
  search: ElementRef;

  constructor(
    private coursesHttpService: CoursesHttpService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseUrl: string = String(
      this.activateRoute.snapshot.paramMap.get('courseUrl')
    );

    this.courseId = String(this.activateRoute.snapshot.paramMap.get('id'));

    // this.course$ = this.coursesHttpService.findCourseByUrl(courseUrl);
    // this.lessons$ = this.course$.pipe(
    //   concatMap((course) => this.coursesHttpService.findLessons(course.id)),
    //   tap(console.log)
    // );

    this.course$ = createIndividualHttpObservable(
      `http://localhost:9000/api/courses/${courseUrl}`
    );

    this.lessons$ = this.loadLessons();
  }

  ngAfterViewInit(): void {
    const searchLessons$ = fromEvent(this.search.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      startWith(''),
      // debounceTime(600),
      // distinctUntilChanged(),
      // throttle(()=> interval(500)),
      throttleTime(500),
      switchMap((searchTerm) => this.loadLessons(searchTerm))
    );

    const initialLessons$ = this.loadLessons();

    // if(this.search.nativeElement.innerHTML) {
      this.lessons$ = concat(searchLessons$, initialLessons$);
    // }
  }

  loadLessons(searchTerm = '') {
    return createHttpObservable(
      `http://localhost:9000/api/lessons?courseId=${this.courseId}&pageSize=10&filter=${searchTerm}`
    ).pipe(map((res) => res));
  }

  loadMoreLessons(course: Course) {}
}
