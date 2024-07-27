import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root',
})
export class CoursesHttpService {
  constructor(private http: HttpClient) {}

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get('http://localhost:9000/api/courses')
      .pipe(map((res: any) => res['payload']));
    // return this.http.get("api/courses").pipe(map((res: any) => res["payload"]));
    // return this.http
    //   .get('https://http-courses-app-default-rtdb.firebaseio.com/courses.json')
    //   .pipe(map((res: any) => {console.log(res);
    // return res;}));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(
      `http://localhost:9000/api/courses/${courseUrl}`
    );
  }

  createCourse(course: Course) {
    return this.http.post<Course>(`http://localhost:9000/api/courses/`, {
      course: course,
    });
  }

  editCourse(courseId: number | string, changes: Partial<Course>) {
    return this.http.put<Course>(`http://localhost:9000/api/course/${courseId}`, changes);
  }

  deleteCourse(courseUrl: string) {
    return this.http.delete<any>(
      `http://localhost:9000/api/courses/${courseUrl}`
    );
  }

  findLessons(courseId: number, pageNumber = 0, pageSize = 3) {
    return this.http.get<Lesson[]>(`http://localhost:9000/api/lessons`, {
      params: new HttpParams()
      .set("courseId", courseId.toString())
      .set("sortOrder", "asc")
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString())
    });
  }
}
