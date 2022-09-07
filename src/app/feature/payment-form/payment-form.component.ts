import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerPaymentInfo } from 'src/app/shared/types';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent {
  @Output() sendCustomerPaymentInfo: EventEmitter<CustomerPaymentInfo> =
    new EventEmitter<CustomerPaymentInfo>();

  // clears the parent component's display
  @Output() formCleared: EventEmitter<any> = new EventEmitter();

  // used for validation display
  public isSubmitted = false;
  public payExceedsBalance = false;
  public invalidEmail = false;
  public invalidAmount = false;

  public accountBalance = 500;

  // create FormGroup that defines the form's controls in the view
  public paymentFormGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: [''],
    accountNumber: [null, Validators.required],
    paymentAmount: [null, Validators.required],
  });

  // getter for the view to access the form's controls
  public get formControls() {
    return this.paymentFormGroup.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  public onSubmitForm(): void {
    // clear the parent component's display
    this.formCleared.emit();

    this.isSubmitted = true;
    this.payExceedsBalance = false;
    this.invalidEmail = false;
    this.invalidAmount = false;

    // allows checking of all conditions to set all pertinent variables
    let errorFound = false;

    // check valid email
    const emailAddr = this.paymentFormGroup.value.email;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailAddr !== null && emailAddr !== '' && !emailRegex.test(emailAddr)) {
      this.invalidEmail = true;
      errorFound = true;
    }

    //const regex = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
    const regex = /^-?(\d+(\.\d{1,2})?|\d*\.(\d{1,2}))$/;
    const amount = this.paymentFormGroup.value.paymentAmount;
    if (!regex.test(amount.toString())) {
      this.invalidAmount = true;
      errorFound = true;
    }

    // check payment amount vs balance
    const payment: number = this.paymentFormGroup.value.paymentAmount;
    // needed this casting due to this.accountBalance = ".01" being treated as "0.0099999999"
    // when making a payment of .01
    if (
      parseFloat(payment.toString()).toFixed(2) >
      parseFloat(this.accountBalance.toString()).toFixed(2)
    ) {
      this.payExceedsBalance = true;
      errorFound = true;
    }

    // check form is valid
    if (this.paymentFormGroup.invalid) {
      errorFound = true;
    }

    if (errorFound) {
      return;
    }

    const info: CustomerPaymentInfo = {
      name: this.paymentFormGroup.value.name,
      email: emailAddr,
      accountNumber: this.paymentFormGroup.value.accountNumber,
      paymentAmount: payment,
      accountBalance: this.accountBalance,
      newAccountBalance: this.getNewBalance(payment, this.accountBalance),
    };
    this.sendCustomerPaymentInfo.emit(info);
  }

  public clearForm(): void {
    this.isSubmitted = false;
    this.paymentFormGroup.reset();
    this.formCleared.emit();
  }

  private getNewBalance(payment: number, balance: number): number {
    this.accountBalance = balance - payment;
    // when balance is less than $1.00 and payment === balance,
    // it was returing "-0.00", so this makes it "0.00"
    if (Math.sign(this.accountBalance) === -1) {
      this.accountBalance = Math.abs(this.accountBalance);
    }
    return this.accountBalance;
  }

  private validateForm(): void {}
}
