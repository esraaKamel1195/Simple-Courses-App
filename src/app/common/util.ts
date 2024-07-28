import { Observable } from 'rxjs';
import { Course } from '../courses/model/course';

export function createHttpObservable(url: string): Observable<Course[]> {
  const controller = new AbortController();
  const signal = controller.signal;

  return new Observable((observable) => {
    fetch(url, {signal})
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observable.next(body);
        observable.complete();
      })
      .catch((err) => {
        console.log(err);
      });
      return () => controller.abort();
  });
}
