import { FormControl } from '@angular/forms';

export interface PaymentFormGroup {
  name: FormControl<string | undefined>;
  email: FormControl<string | null>;
  accountNumber: FormControl<number | undefined>;
  paymentAmount: FormControl<number | undefined>;
}

export interface CustomerPaymentInfo {
  name: string | undefined;
  email?: string | null;
  accountNumber: number | undefined;
  paymentAmount: number | undefined;
  accountBalance: number | undefined;
  newAccountBalance: number | undefined;
}
export interface StudentTotal {
  studentName: string;
  amountOwed: number;
  owedTo: string;
}

export interface StudentExpense {
  name: string;
  amount: number | null;
}

export interface StudentExpenseModel {
  name: string;
  amount: number | null;
  invalidName: boolean;
  invalidAmount: boolean;
}

export const CIPHER: any = {
  o: 'a',
  h: 'e',
  c: 'e',
  u: 'e',
  q: 'e',
  l: 'i',
  i: 'i',
  s: 'o',
  d: 'g',
  g: 'l',
  t: 'm',
  j: 'n',
  b: 'r',
  r: 's',
  m: 's',
  p: 'w',
  a: 'G',
  e: 'X',
  k: 'Y',
  n: 'Z',
  f: 'K',
};
