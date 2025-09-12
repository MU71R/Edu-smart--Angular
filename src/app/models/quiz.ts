export interface Quiz {
    _id?: string;
    title: string;
    category: string;
    relatedCourse: string;
    timeLimit: number;
    passPercentage: number;
    questions: {
      text: string;
      options: string[];
      correctAnswer: string;
    }[];
}
