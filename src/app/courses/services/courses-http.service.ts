import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesHttpService {
  constructor(private http: HttpClient) {}

  findAllCourses(): Observable<Course[]> {
    // return this.http.get("/api/courses").pipe(map((res: any) => res["payload"]));
    return this.http
      .get('https://http-courses-app-default-rtdb.firebaseio.com/courses.json')
      .pipe(map((res: any) => {console.log(res);
    return res;}));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseUrl}`);
  }

  findLessons() {}
}
