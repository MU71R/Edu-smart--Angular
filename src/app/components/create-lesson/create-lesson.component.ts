import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';
import { InstructorDashboardService } from 'src/app/services/service-instructor.service';
import { QuizzesServiceService } from 'src/app/services/quizzes-service.service';
import { Lesson } from 'src/app/models/lesson';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  @Input() showModal = false;
  @Output() close = new EventEmitter<void>();

  lessonForm!: FormGroup;
  quizzes: any[] = [];
  myCourses: any[] = [];
  courseLessons: Lesson[] = [];
  activeTab: 'details' | 'quiz' | 'resources' = 'details';

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private instructorService: InstructorDashboardService,
    private qService: QuizzesServiceService
  ) {}

  ngOnInit(): void {
    this.lessonForm = this.fb.group({
      courseID: ['', Validators.required],
      existingLessonID: [null], // درس موجود لو هضيف كويز فقط
      title: ['', Validators.required],
      content: [''],
      videoURL: [''],
      duration: [0],
      isPreview: [false],

      requiredQuiz: [null],
      requiredScoreForAccess: [0],

      newQuizTitle: [''],
      newQuizQuestions: this.fb.array([]),

      resources: this.fb.array([])
    });

    // Validators ديناميكي للعنوان حسب اختيار درس موجود
    this.lessonForm.get('existingLessonID')?.valueChanges.subscribe(value => {
      const titleControl = this.lessonForm.get('title');
      if (value) {
        titleControl?.clearValidators(); // درس موجود → العنوان مش مطلوب
      } else {
        titleControl?.setValidators([Validators.required]); // درس جديد → العنوان مطلوب
      }
      titleControl?.updateValueAndValidity();
    });

    this.loadCourses();
    this.loadQuizzes();
  }

  // Resources
  get resources(): FormArray {
    return this.lessonForm.get('resources') as FormArray;
  }
  addResource() {
    this.resources.push(this.fb.control(''));
  }
  removeResource(index: number) {
    this.resources.removeAt(index);
  }

  // Quiz
  get newQuizQuestions(): FormArray {
    return this.lessonForm.get('newQuizQuestions') as FormArray;
  }
  addQuestion() {
    const questionGroup = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([this.fb.control('')]),
      correctAnswer: [0, Validators.required]
    });
    this.newQuizQuestions.push(questionGroup);
  }
  removeQuestion(index: number) {
    this.newQuizQuestions.removeAt(index);
  }
  addOption(qIndex: number) {
    const options = this.newQuizQuestions.at(qIndex).get('options') as FormArray;
    options.push(this.fb.control(''));
  }
  removeOption(qIndex: number, optIndex: number) {
    const options = this.newQuizQuestions.at(qIndex).get('options') as FormArray;
    options.removeAt(optIndex);
  }
  getOptionsControls(qIndex: number) {
    return (this.newQuizQuestions.at(qIndex).get('options') as FormArray).controls;
  }

  // API
  loadCourses() {
    this.instructorService.getInstructorCourses().subscribe({
      next: (res: any) => (this.myCourses = res),
      error: err => console.error('Error loading courses', err)
    });
  }

  loadQuizzes() {
    this.qService.getAll().subscribe({
      next: (res: any) => (this.quizzes = res),
      error: err => console.error('Error loading quizzes', err)
    });
  }

  onCourseChangeFromEvent(event: any) {
    const courseId = event.target.value;
    if (!courseId) return;

    this.lessonService.getLessonsByCourseId(courseId).subscribe({
      next: (res) => {
        this.courseLessons = res;
      },
      error: (err) => console.error(err)
    });
  }

  onQuizSelectFromEvent(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.lessonForm.get('requiredQuiz')?.setValue(select.value);
  }

  // Submit
  onSubmit() {
    console.log('--- onSubmit called ---');
  
    const isExistingLesson = !!this.lessonForm.value.existingLessonID;
  
    // إذا درس موجود → تجاهل Validators
    if (isExistingLesson) {
      this.lessonForm.get('title')?.clearValidators();
      this.lessonForm.get('title')?.updateValueAndValidity();
      this.lessonForm.get('content')?.clearValidators();
      this.lessonForm.get('content')?.updateValueAndValidity();
    }
  
    // تحقق من الفورم فقط إذا درس جديد
    if (!isExistingLesson && this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      console.warn('Form is invalid', this.lessonForm.value);
      return;
    }
  
    // تحويل أسئلة الكويز لتطابق الـ backend
    const transformedQuiz = this.lessonForm.value.newQuizQuestions.map((q: any) => ({
      text: q.questionText,                       // بدل questionText
      options: q.options.filter((opt: string) => opt.trim() !== ''),
      correctAnswer: q.correctAnswer             // بدل correctAnswerIndex
    }));
    console.log('Transformed quiz:', transformedQuiz);
  
    const existingLessonId: string | null = this.lessonForm.value.existingLessonID ?? null;
    const selectedQuizId: string | null = this.lessonForm.value.requiredQuiz ?? null;
  
    console.log('Existing Lesson ID:', existingLessonId);
    console.log('Selected Quiz ID:', selectedQuizId);
  
    const createOrUpdateLesson = (lessonId: string | null, quizId: string | null) => {
      if (!lessonId) {
        // درس جديد
        console.log('Creating new lesson...');
        const lessonData: any = {
          courseID: this.lessonForm.value.courseID,
          title: this.lessonForm.value.title,
          content: this.lessonForm.value.content,
          videoURL: this.lessonForm.value.videoURL || null,
          duration: this.lessonForm.value.duration >= 1 ? this.lessonForm.value.duration : 1, // تجنب duration=0
          isPreview: this.lessonForm.value.isPreview || false,
          requiredQuiz: quizId,
          resources: this.lessonForm.value.resources.filter((r: string) => r.trim() !== '')
        };
        console.log('Lesson data to create:', lessonData);
  
        this.lessonService.createLesson(lessonData).subscribe({
          next: () => {
            console.log('Lesson created successfully');
            this.closeModal();
          },
          error: err => console.error('Error creating lesson', err)
        });
      }
    };
  
    if (this.lessonForm.value.newQuizTitle && transformedQuiz.length > 0) {
      // إنشاء كويز جديد
      console.log('Creating new quiz...');
      const quizPayload = {
        title: this.lessonForm.value.newQuizTitle,
        category: 'Angular', // تأكد أنها ضمن enum على الـ backend
        relatedCourse: this.lessonForm.value.courseID,
        timeLimit: 10,        // ≥ 1
        passPercentage: 0,
        questions: this.lessonForm.value.newQuizQuestions.map((q: any) => ({
          text: q.questionText,               // يجب أن يكون 'text'
          options: q.options.filter((opt: string) => opt.trim() !== ''),
          correctAnswer: Math.min(q.correctAnswer, q.options.length - 1) // ضمن النطاق
        }))
      };        
      console.log('Quiz payload:', quizPayload);
  
      this.qService.createQuiz(quizPayload as unknown as Quiz).subscribe({
        next: (res: any) => {
          console.log('Quiz created successfully', res);
          const newQuizId = res._id;
  
          if (existingLessonId || selectedQuizId) {
            // درس موجود أو ربط بكويز موجود
            const lessonIdToUse = existingLessonId ?? res.relatedLessonId;
            createOrUpdateLesson(lessonIdToUse, newQuizId);
          } else {
            // درس جديد
            createOrUpdateLesson(null, newQuizId);
          }
        },
        error: err => console.error('Error creating quiz', err)
      });
    }
  }
  closeModal() {
    this.close.emit();
    document.body.classList.remove('modal-open');
  }

  // عنوان ديناميكي للكويز
  get quizSectionTitle(): string {
    return this.lessonForm.get('existingLessonID')?.value ? 
      'Add Quiz to Existing Lesson' : 'Create New Quiz (Optional)';
  }  
}
