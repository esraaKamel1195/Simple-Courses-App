import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {
  catchError,
  delay,
  delayWhen,
  finalize,
  map,
  Observable,
  of,
  retry,
  retryWhen,
  shareReplay,
  throwError,
  timer,
} from 'rxjs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { compareCourses, Course } from '../model/course';
import { CoursesHttpService } from '../services/courses-http.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    CoursesCardListComponent,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean> = new Observable<boolean>();
  promoTotal$: Observable<number> = new Observable<number>();
  beginnerCourses$: Observable<Course[] | any> = new Observable<Course[]>();
  advancedCourses$: Observable<Course[] | any> = new Observable<Course[]>();

  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    const courses$ = this.coursesHttpService.findAllCourses().pipe(
      catchError((err) => {
        console.log('An Error occured ', err);
        return throwError(() => err);
      }),
      // catchError((err) =>
      //   of([
      //     {
      //       id: 4,
      //       description: 'NgRx (with NgRx Data) - The Complete Guide',
      //       longDescription:
      //         'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
      //       iconUrl:
      //         'https://angular-university.s3-us-west-1.amazonaws.com/course-images/ngrx-v2.png',
      //       category: 'BEGINNER',
      //       lessonsCount: 10,
      //       seqNo: 0,
      //       url: 'ngrx-course',
      //     },
      //   ])
      // ),
      finalize(() => {
        console.log('finalize called');
      }),
      map((courses) => courses.sort(compareCourses)),
      shareReplay<Course[]>(),
      retryWhen((err: any) => err.pipe(
        // delayWhen(()=> timer(2000)),
        delay(2000)
      )),
    );

    this.loading$ = courses$.pipe(map((courses) => !!courses));

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog
      .open(CourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }
}
