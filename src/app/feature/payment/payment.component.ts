import { Component } from '@angular/core';
import { CustomerPaymentInfo } from 'src/app/shared/types';
import { PaymentService } from 'src/app/shared/services/payment.service';

const CLEARED_INFO: CustomerPaymentInfo = {
  name: '',
  email: '',
  accountNumber: undefined,
  paymentAmount: undefined,
  accountBalance: undefined,
  newAccountBalance: undefined,
};

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  public customerInfo: CustomerPaymentInfo = CLEARED_INFO;

  constructor(private paymentService: PaymentService) {}

  public processCustomerPaymentInfo(info: CustomerPaymentInfo): void {
    this.customerInfo = info;
    console.log('Customer Info', info);
  }

  public clearPaymentData(): void {
    this.customerInfo = CLEARED_INFO;
  }
}
