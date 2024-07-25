export interface Course {
  id: number;
  seqNo: number;
  url: string;
  iconUrl: string;
  courseListIcon: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount: number;
  promo: boolean;
}

export function compareCourses(course1: Course, course2: Course) {
  const compare = course1.seqNo - course2.seqNo;

  if(compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else {
    return 0;
  }
}