import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { CoursesService } from 'src/app/services/courses.service';
import { InstructorDashboardService } from 'src/app/services/service-instructor.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup;
  showModal: boolean = true;
  categories = ['Frontend', 'Backend', 'AI'];
  levels = ['Beginner', 'Intermediate', 'Advanced'];
  myCourses: Cours[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CoursesService,
    private instructorService: InstructorDashboardService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      type: ['course', Validators.required],

      // common
      title: [null],
      description: [null],
      categoryID: [null],
      coverImage: [null],
      price: [0],

      // only for course
      level: [null],
      language: [null],
      estimatedDuration: [null],
      videoUrl: [null],
      videoFile: [null],

      // only for package
      packageCourses: this.fb.array([]),
      discountPercentage: [0],
      students: this.fb.array([]),
      keySkills: this.fb.array([]),
      careerPaths: this.fb.array([])
    });

    this.courseForm.get('type')?.valueChanges.subscribe(value => {
      this.setValidatorsByType(value);
    });

    this.setValidatorsByType(this.courseForm.get('type')?.value);

    // load instructor courses
    this.instructorService.getInstructorCourses().subscribe((courses: Cours[]) => {
      this.myCourses = courses;
    });
  }

  // ===================== FormArrays =====================
  get packageCourses(): FormArray { return this.courseForm.get('packageCourses') as FormArray; }
  get students(): FormArray { return this.courseForm.get('students') as FormArray; }
  get keySkills(): FormArray { return this.courseForm.get('keySkills') as FormArray; }
  get careerPaths(): FormArray { return this.courseForm.get('careerPaths') as FormArray; }

  addPackageCourse(value: string = '') { this.packageCourses.push(this.fb.control(value, Validators.required)); }
  removePackageCourse(index: number) { this.packageCourses.removeAt(index); }

  addKeySkill(value: string = '') { this.keySkills.push(this.fb.control(value, Validators.required)); }
  removeKeySkill(index: number) { this.keySkills.removeAt(index); }

  addCareerPath(value: string = '') { this.careerPaths.push(this.fb.control(value, Validators.required)); }
  removeCareerPath(index: number) { this.careerPaths.removeAt(index); }

  // ===================== Dynamic Validators =====================
  setValidatorsByType(type: string) {
    Object.keys(this.courseForm.controls).forEach(key => {
      this.courseForm.get(key)?.clearValidators();
      this.courseForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });

    if(type === 'course') {
      ['title','description','categoryID','level','language','estimatedDuration','price','coverImage'].forEach(key => {
        this.courseForm.get(key)?.setValidators([Validators.required]);
      });
      this.courseForm.get('estimatedDuration')?.setValidators([Validators.required, Validators.min(1)]);
      this.courseForm.get('price')?.setValidators([Validators.required, Validators.min(0)]);
    } else if(type === 'package') {
      this.courseForm.get('title')?.setValidators([Validators.required]);
      this.courseForm.get('packageCourses')?.setValidators([Validators.minLength(1)]);
    }

    Object.keys(this.courseForm.controls).forEach(key => {
      this.courseForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  onFileSelected(event: any, controlName: string) {
    const file: File = event.target.files[0];
    if (file) this.courseForm.get(controlName)?.setValue(file);
  }

  onSubmit() {
    console.log('SUBMIT CLICKED — form value:', this.courseForm.value);
  
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    const type = this.courseForm.get('type')?.value;
  
    formData.append('type', type);
    formData.append('title', this.courseForm.get('title')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('categoryID', this.courseForm.get('categoryID')?.value || '');
  
    // إضافة الصورة لو موجودة
    const coverImageFile = this.courseForm.get('coverImage')?.value;
    if (coverImageFile) {
      formData.append('coverImage', coverImageFile);
    }
  
    // حقول خاصة بالكورس الفردي
    if (type === 'course') {
      formData.append('price', String(this.courseForm.get('price')?.value || 0));
      formData.append('estimatedDuration', String(this.courseForm.get('estimatedDuration')?.value || 0));
      formData.append('language', this.courseForm.get('language')?.value || '');
      formData.append('level', this.courseForm.get('level')?.value || '');
    }
  
    // حقول خاصة بالباكج
    if (type === 'package') {
      formData.append('price', String(this.courseForm.get('price')?.value || 0));
      formData.append('discountPercentage', String(this.courseForm.get('discountPercentage')?.value || 0));
      
      // إرسال الكورسات داخل الباكج
      this.packageCourses.controls.forEach(ctrl => {
        formData.append('package', ctrl.value);
      });
  
      // إرسال المهارات والمسارات
      this.keySkills.controls.forEach(ctrl => {
        formData.append('keySkills', ctrl.value);
      });
      this.careerPaths.controls.forEach(ctrl => {
        formData.append('careerPaths', ctrl.value);
      });
    }
  
    // إرسال الفورم للـ backend
    this.courseService.createCourse(formData).subscribe({
      next: res => {
        console.log('Created successfully', res);
        this.showModal = false;
        this.router.navigate(['/courses']);
      },
      error: err => {
        console.error('Error creating course', err);
      }
    });
  }
}
