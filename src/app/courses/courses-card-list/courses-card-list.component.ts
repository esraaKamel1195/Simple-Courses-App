import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';
import { createHttpObservable } from '../../common/util';

@Component({
  selector: 'app-courses-card-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent implements OnInit {
  @Input({ required: false }) courses: Course[] = [];
  @Output() courseChanged: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // // Implementing a Cancellable HTTP Observable
    // const http$ = createHttpObservable('http://localhost:9000/api/courses');
    // const sub = http$.subscribe();

    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 0);
  }

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Update Course',
      mode: 'update',
      course: course,
    };

    this.dialog
      .open(CourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => console.log);
  }

  onDeleteCourse(course: Course) {}
}
