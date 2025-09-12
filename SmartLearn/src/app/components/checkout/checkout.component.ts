import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { Package } from 'src/app/models/package';
import { CoursesService } from 'src/app/services/courses.service';
import { PackageService } from 'src/app/services/package.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  item: Cours | Package | null = null;
  itemType: 'course' | 'package' = 'course';
  loading = true;
  error = false;
  fee = 2; // رسوم ثابتة مثال
userData: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private packageService: PackageService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.queryParamMap.get('type');

    if (type === 'package') {
      this.itemType = 'package';
      this.loadPackage(itemId!);
    } else {
      this.itemType = 'course';
      this.loadCourse(itemId!);

    }
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  loadCourse(itemId: string) {
    this.courseService.getCourseById(itemId).subscribe({
      next: (course: Cours) => {
        this.item = course;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadPackage(itemId: string) {
    this.packageService.getPackageById(itemId).subscribe({
      next: (pkg) => {
        this.item = pkg;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  getStudentCount(): number {
    if (!this.item) return 0;
    const students = (this.item as any).students;

    if (Array.isArray(students)) {
      return students.length;
    }
    if (typeof students === 'number') {
      return students;
    }
    return 0;
  }

  calculateDiscount(): number {
    if (!this.item) return 0;

    if (this.itemType === 'course') {
      return (this.item as Cours).discount || 0;
    }

    if (this.itemType === 'package') {
      return (this.item as Package).discountPercentage || 0;
    }

    return 0;
  }

  calculateTotal(): number {
    if (!this.item) return 0;

    let basePrice = this.item.price || 0;
    const discount = this.calculateDiscount();

    if (discount > 0) {
      basePrice = basePrice - (basePrice * discount) / 100;
    }

    return basePrice + this.fee;
  }

  checkout() {
    if (!this.item) return;

    const userId = this.userData._id; // مؤقت

    const payload = {
      userId,
      itemId: (this.item as any)._id,
      itemType: this.itemType, // 👈 مهم جدا
      amount: this.calculateTotal()
    };

    console.log("📌 Payload Sent to Backend:", payload);

    this.paymentService.createOrder(payload).subscribe({
      next: (res) => {
        console.log("✅ PayPal Order Created:", res);
        if (res.approvalUrl) {
          window.location.href = res.approvalUrl;
        }
      },
      error: (err) => console.error('❌ Error creating order:', err)
    });
  }
}
