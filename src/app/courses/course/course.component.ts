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
  AsyncSubject,
  BehaviorSubject,
  concat,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  interval,
  map,
  Observable,
  ReplaySubject,
  startWith,
  Subject,
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
import { debug, RXJSLoggingLevel } from '../../common/debug';

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
    ).pipe(debug(RXJSLoggingLevel.INFO, 'Course Value'));

    this.lessons$ = this.loadLessons();

    // forkJoin implementation method
    // forkJoin(this.course$, this.lessons$).pipe(
    //   tap(([course,lessons])=> {
    //     console.log("course", course);
    //     console.log("lessons", lessons);
    //   })
    // ).subscribe();



    // <!*********************use subjects (behavior subject, reply subject, async subject)******************>
    // try subject
    const subject = new Subject();
    subject.subscribe((value)=> console.log("subject Subscriber 1", value));
    subject.next(1);

    subject.subscribe((value)=> console.log("subject Subscriber 2", value));
    subject.next(2);


    // try behavior subject

    const behaviorSubject = new BehaviorSubject<number>(1);
    behaviorSubject.subscribe((value)=> console.log("behaviorSubject subscriber 1", value));
    behaviorSubject.next(2);

    behaviorSubject.subscribe((value)=> console.log("behaviorSubject subscriber 2", value));
    behaviorSubject.next(3);


    // try reply subject
    // the parameter is buffer size اللي هييجي جديد هيشوف قيمة واحده بس
    const replaySubject = new ReplaySubject<number>(1);
    replaySubject.subscribe((value)=> console.log("replaySubject subscriber 1", value));
    replaySubject.next(1);
    replaySubject.next(2);

    replaySubject.subscribe((value)=> console.log("replaySubject subscriber 2", value));
    replaySubject.next(3);


    // try async subject
    // publish last variable before complete
    const asyncSubject = new AsyncSubject<number>();
    asyncSubject.subscribe((value)=> console.log("asyncSubject subscriber 1", value));

    asyncSubject.next(1);
    asyncSubject.next(2);

    asyncSubject.subscribe((value)=> console.log("asyncSubject subscriber 2", value));
    asyncSubject.next(3);
    asyncSubject.complete();
  }

  ngAfterViewInit(): void {
    const searchLessons$ = fromEvent(this.search.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      startWith(''),
      debounceTime(600),
      distinctUntilChanged(),
      // throttle(()=> interval(500)),
      // throttleTime(500),
      switchMap((searchTerm) => this.loadLessons(searchTerm)),
      debug(RXJSLoggingLevel.INFO, 'Searched Lessons value')
    );

    const initialLessons$ = this.loadLessons();
    this.lessons$ = concat(searchLessons$, initialLessons$);
  }

  loadLessons(searchTerm = '') {
    return createHttpObservable(
      `http://localhost:9000/api/lessons?courseId=${this.courseId}&pageSize=10&filter=${searchTerm}`
    ).pipe(
      map((res) => res),
      debug(RXJSLoggingLevel.INFO, 'Lessons value')
    );
  }

  loadMoreLessons(course: Course) {}
}
