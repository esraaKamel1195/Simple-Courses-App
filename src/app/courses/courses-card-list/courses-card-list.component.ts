import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses-card-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  @Input({ required: false }) courses: Course[] = [];
  @Output() courseChanged: EventEmitter<any> = new EventEmitter();

  editCourse(course: Course) {}

  onDeleteCourse(course: Course) {}
}
