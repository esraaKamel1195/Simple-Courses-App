import { Observable } from 'rxjs';
import { Course } from '../courses/model/course';

export function createHttpObservable(url: string): Observable<any[]> {
  const controller = new AbortController();
  const signal = controller.signal;

   return new Observable((observable) => {
    fetch(url, {signal})
      .then((response: any) => {
        if(response.ok) {
          return response.json();
        }else {
          observable.error("Request fails with status code" +response.status)
        }
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

export function createIndividualHttpObservable(url: string): Observable<Course> {
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