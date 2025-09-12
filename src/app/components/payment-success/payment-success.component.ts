import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  loading = true;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderID = this.route.snapshot.queryParamMap.get('token') || this.route.snapshot.queryParamMap.get('orderID'); // PayPal يرجع token
    const itemId = this.route.snapshot.queryParamMap.get('itemId'); // نفس اللي بعتناه في return_url
    const itemType = this.route.snapshot.queryParamMap.get('itemType'); 
  
    if (!orderID || !itemId || !itemType) {
      this.loading = false;
      return;
    }
  
    this.paymentService.captureOrder(orderID).subscribe({
      next: (res) => {
        console.log('📌 Payment capture response:', res);
        this.success = res.success;
        this.loading = false;
  
        if (res.success) {
          setTimeout(() => {
            if (itemType === 'course') {
              this.router.navigate(['/course-details', itemId]);
            } else {
              this.router.navigate(['/package-details', itemId]);
            }
          }, 3000);
        }
      },
      error: (err) => {
        console.error('❌ Payment error:', err);
        this.success = false;
        this.loading = false;
      }
    });
  }  
}
