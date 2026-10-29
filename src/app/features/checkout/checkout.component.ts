import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-checkout',
  styleUrl: './checkout.component.css',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  cartId: WritableSignal<string> = signal<string>('');
  ngOnInit(): void {

  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (resp) => {
        this.cartId.set(resp.get('id')!);

      }
    })
  }

}
