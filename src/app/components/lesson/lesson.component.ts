import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lesson } from 'src/app/models/lesson';
import { LessonService } from 'src/app/services/lesson.service';
import { EnrollmentsService } from 'src/app/services/enrollment-service.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var YT: any; // YouTube IFrame API

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  courseContent: Lesson[] = [];
  selectedItem?: Lesson;
  enrollmentId?: string;
  player: any;
  progressPercent = 0;

  // Quiz state
  quizStarted = false;
  quizCompleted = false;
  quizPassed = false;
  answers: Record<number, string> = {};

  constructor(
    private lessonService: LessonService,
    private enrollmentService: EnrollmentsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.enrollmentId = this.route.snapshot.queryParamMap.get('enrollmentId') || undefined;

    if (courseId) {
      this.lessonService.getLessonsByCourseId(courseId).subscribe({
        next: (res) => {
          // add watched default
          this.courseContent = res.map(lesson => ({ ...lesson, watched: lesson.watched || false }));
          if (res.length > 0) this.selectItem(this.courseContent[0]);
          this.updateProgressBar();
        },
        error: (err) => console.error(err)
      });
    }
  }

  /** ==================== VIDEO LOGIC ==================== */

  isYouTube(url?: string): boolean {
    return !!url && (url.includes('youtube') || url.includes('youtu.be'));
  }

  getYoutubeId(url: string): string | null {
    if (!url) return null;
    const vMatch = url.match(/v=([^&]+)/);
    if (vMatch) return vMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];
    return null;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    if (!this.isYouTube(url)) return url;
    const videoId = this.getYoutubeId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1`);
  }

  async loadYouTubeApi(): Promise<void> {
    return new Promise(resolve => {
      if ((window as any).YT && (window as any).YT.Player) {
        resolve();
        return;
      }
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      (window as any).onYouTubeIframeAPIReady = () => resolve();
    });
  }

  async selectItem(item: Lesson) {
    if (!this.canSelectLesson(this.courseContent.indexOf(item))) return;
    this.selectedItem = item;

    // Reset quiz state if lesson is quiz
    if (item.isQuiz) {
      this.quizStarted = false;
      this.quizCompleted = false;
      this.quizPassed = false;
      this.answers = {};
      return;
    }

    // If video
    if (this.isYouTube(item.videoURL)) {
      await this.loadYouTubeApi();
      setTimeout(() => this.loadYouTubePlayer(), 0);
    }
  }

  loadYouTubePlayer() {
    const videoId = this.getYoutubeId(this.selectedItem?.videoURL!);
    if (!videoId) return;

    if (this.player) {
      this.player.loadVideoById(videoId);
      return;
    }

    this.player = new YT.Player('youtube-player', {
      videoId: videoId,
      events: {
        onStateChange: (event: any) => {
          if (event.data === YT.PlayerState.ENDED) {
            this.onVideoEnded(this.selectedItem!);
          }
        }
      }
    });
  }

  onVideoEnded(lesson: Lesson) {
    if (!this.enrollmentId) return;
  
    this.enrollmentService.completeLesson(this.enrollmentId, lesson._id).subscribe({
      next: () => {
        lesson.watched = true;
        this.cdr.detectChanges();
        this.updateProgressBar();
  
        //  فتح الدرس اللي بعده تلقائي
        const currentIndex = this.courseContent.findIndex(l => l._id === lesson._id);
        const nextLesson = this.courseContent[currentIndex + 1];
        if (nextLesson) {
          this.selectItem(nextLesson);
        } else {
          // لو خلص الكورس كله
          console.log("🎉 كل الدروس اتعملها مشاهدة!");
        }
      },
      error: (err) => console.error(err),
    });
  }
  
  

  /** ==================== QUIZ LOGIC ==================== */

  startQuiz() {
    this.quizStarted = true;
  }

  skipQuiz() {
    this.onVideoEnded(this.selectedItem!); // treat skipped quiz as completed
  }

  selectAnswer(qIndex: number, option: string) {
    this.answers[qIndex] = option;
  }

  submitQuiz() {
    this.quizCompleted = true;
    let correct = 0;

    this.selectedItem?.questions?.forEach((q: any, i: number) => {
      if (this.answers[i] === q.correct) correct++;
    });

    this.quizPassed = correct === this.selectedItem?.questions?.length;
  }

  onQuizPassed(lesson: Lesson) {
    if (!this.enrollmentId) return;
  
    this.enrollmentService.completeLesson(this.enrollmentId, lesson._id).subscribe({
      next: () => {
        lesson.watched = true;
        this.quizCompleted = false;
        this.quizStarted = false;
        this.answers = {};
        this.updateProgressBar();
  
        //  فتح الدرس اللي بعده تلقائي
        const currentIndex = this.courseContent.findIndex(l => l._id === lesson._id);
        const nextLesson = this.courseContent[currentIndex + 1];
        if (nextLesson) {
          this.selectItem(nextLesson);
        } else {
          console.log("🎉 الكورس كله خلص!");
        }
      },
      error: (err) => console.error(err),
    });
  }
  
  

  /** ==================== GENERAL ==================== */

  updateProgressBar() {
    const total = this.courseContent.length;
    const completed = this.courseContent.filter(l => l.watched).length;
    this.progressPercent = total ? Math.round((completed / total) * 100) : 0;
  }

  canSelectLesson(index: number): boolean {
    return true; // ✅ كل الدروس مفتوحة بدون قيود
  }
  

  allLessonsWatched(): boolean {
    return this.progressPercent === 100;
  }

  goToCertificate() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) this.router.navigate(['/certificate', courseId]);
  }
}
