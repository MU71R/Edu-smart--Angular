export interface Lesson {
    _id: string;
    courseID: string;
    title: string;
    content: string;
    videoURL?: string;
    resources: string[];
    duration: number;
    isPreview: boolean;
    requiredQuiz?: string;
    isQuiz?: boolean; // يحدد هل الدرس كويز ولا لأ
    questions?: {
      question: string;
      options: string[];
      correct: string;
    }[];
    requiredScoreForAccess: number;
    createdAt?: string;
    updatedAt?: string;
    watched?: boolean;
  }
