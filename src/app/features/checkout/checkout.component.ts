import { Component, inject, OnInit, signal, WritableSignal, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sign } from 'node:crypto';
import { validateHeaderValue } from 'node:http';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-checkout',
  styleUrl: './checkout.component.css',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService)
  private readonly router = inject(Router)
  cartId: WritableSignal<string> = signal<string>('');
  paymentMethod: WritableSignal<string> = signal<string>('cash');
  checkOutform: WritableSignal<FormGroup> = signal(new FormGroup({}));

  ngOnInit(): void {
    this.getCartId();
    this.checkoutFormiInit();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (resp) => {
        this.cartId.set(resp.get('id')!);

      }
    })
  }

  checkoutFormiInit(): void {
    this.checkOutform.set(this.fb.group({
      shippingAddress: this.fb.group({
        details: ['', [Validators.required]],
        city: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^(\+20|01|00201)[0-2,5]{1}[0-9]{8}$/)]]
      })

    }))


  }
  changePaymentMethod(input: HTMLInputElement): void {
    this.paymentMethod.set(input.value);
  }
  submitForm(): void {
    if (this.checkOutform()?.valid) {
      if (this.paymentMethod() === 'visa') {
        this.paymentService.checkoutSession(this.cartId(), this.checkOutform().value).subscribe({
          next: (resp) => {
            if (resp.status === 'success') {
              open(resp.session.url, '_self')
            }
          }
        })
      }

      else if (this.paymentMethod() === 'cash') {
        this.paymentService.createCacheOrdar(this.cartId(), this.checkOutform().value).subscribe({
          next: (resp) => {
            if (resp.status === 'success') {
              //navigate to orders
              this.router.navigate(['/allorders'])
            }
          }
        })
      }
    }
  }

}
