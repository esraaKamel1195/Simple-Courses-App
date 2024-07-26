import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

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
export class CourseComponent {
  loading$: Observable<boolean> | undefined;
  course$: Observable<Course> | undefined;
  lessons$: Observable<any> | undefined;

  displayedColumns = ["seqNo", "description", "duration"];

  loadLessonsPage(course: Course) {
    throw new Error('Method not implemented.');
  }
}
