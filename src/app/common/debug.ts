import { Observable, tap } from 'rxjs';

export enum RXJSLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR,
}

let rxJsLoggingLevel = RXJSLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RXJSLoggingLevel) {
  rxJsLoggingLevel = level;
}

// Higher order function = function return other functions
export const debug =
  (loggingLevel: number, message: string) => (source: Observable<any>) =>
    source.pipe(
      tap((value) => {
        console.log(message + ':', value);
      })
    );
