import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable, shareReplay } from 'rxjs';
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
    MatButtonModule
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
      map((courses) => courses.sort(compareCourses)),
      shareReplay()
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

    this.dialog.open(CourseDialogComponent, dialogConfig).afterClosed().subscribe();
  }
}
