import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { concatMap, Observable, tap } from 'rxjs';
import { Course } from '../model/course';
import { CoursesHttpService } from '../services/courses-http.service';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  loading$: Observable<boolean> | undefined;
  course$: Observable<Course> | undefined;
  lessons$: Observable<any> | undefined;

  displayedColumns = ["seqNo", "description", "duration"];
  nextPage = 0;

  constructor(
    private coursesHttpService: CoursesHttpService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const courseUrl: string = String(this.activateRoute.snapshot.paramMap.get('courseUrl'));

    this.course$ = this.coursesHttpService.findCourseByUrl(courseUrl);

    this.lessons$ = this.course$.pipe(
      concatMap((course) => this.coursesHttpService.findLessons(course.id)),
      tap(console.log)
    );
  }

  loadLessonsPage(course: Course) {

  }
}
