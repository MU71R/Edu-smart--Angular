export interface Enrollment {
    _id: string;
    studentId: string;
    courseId?: {
      _id: string;
      title: string;
      coverImageURL: string;
      instructorID: string;
    };
    progress: number; // نسبة التقدم
  }