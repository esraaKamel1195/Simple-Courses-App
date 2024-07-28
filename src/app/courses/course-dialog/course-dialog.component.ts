import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  concatMap,
  exhaustMap,
  filter,
  fromEvent,
  from as fromPromise,
  mergeMap,
  Observable,
} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CoursesHttpService } from '../services/courses-http.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  dialogTitle: string = '';
  loading$: Observable<boolean> = new Observable<boolean>();
  form: FormGroup = new FormGroup({});
  mode: 'create' | 'update';
  course: Course;

  @ViewChild('saveButton', { static: true, read: ElementRef })
  saveButton: ElementRef<HTMLButtonElement>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private coursesService: CoursesHttpService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;
  }

  ngOnInit(): void {
    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []],
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...this.course });
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required],
      });
    }

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        // ConcatMap rxjs function
        // concatMap(changes =>
        //   this.saveCourse(changes)
        // ),

        // mergeMap rxjs Function
        mergeMap((changes) => this.saveCourse(changes))
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
        // concatMap(() => this.saveCourse(this.form.value)),
        exhaustMap(() => this.saveCourse(this.form.value))
      )
      .subscribe();
  }

  saveCourse(changes: any) {
    return fromPromise(
      fetch(`http://localhost:9000/api/course/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json',
        },
      })
    );
  }

  onSave() {
    console.log('from onSave func');
    const course: Course = {
      ...this.course,
      ...this.form.value,
    };

    this.coursesService
      .editCourse(course.id, course)
      .subscribe(() => this.dialogRef.close());
  }

  onClose() {
    this.dialogRef.close();
  }
}
