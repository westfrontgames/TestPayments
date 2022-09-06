import { Component, EventEmitter, Output } from '@angular/core';
import {
  StudentExpense,
  StudentExpenseModel,
  StudentTotal,
} from 'src/app/shared/types';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent {
  @Output() showStudentTotals: EventEmitter<StudentTotal[]> =
    new EventEmitter();
  @Output() expenseSubmitted: EventEmitter<StudentExpense> = new EventEmitter();
  public isSubmitted = false;

  // the model
  public expense: StudentExpenseModel = {
    name: '',
    amount: null,
    invalidAmount: false,
    invalidName: false,
  };

  // This will replace an actual database
  public allExpenses: StudentExpense[] = [];

  public allCurrExpenses: any = {};
  public totalCurrExpenses: number = 0;

  public saveExpense(): void {
    let errorFound = false;

    if (this.expense.name.replace(' ', '') === '') {
      this.expense.invalidName = true;
      errorFound = true;
    }

    if (this.expense.amount === null || this.expense.amount <= 0) {
      this.expense.invalidAmount = true;
      errorFound = true;
    }

    const regex = /^-?(\d+(\.\d{1,2})?|\d*\.(\d{1,2}))$/;
    const amount = this.expense.amount === null ? 0 : this.expense.amount;
    if (!regex.test(amount.toString())) {
      this.expense.invalidAmount = true;
      errorFound = true;
    }

    if (errorFound) {
      return;
    }

    this.allCurrExpenses = {};
    this.totalCurrExpenses = 0;
    // equivalent of doing an Insert to the database
    this.allExpenses.push({
      name: this.expense.name,
      amount: this.expense.amount,
    });

    this.expense.invalidName = false;
    this.expense.invalidAmount = false;

    this.expenseSubmitted.emit(this.expense);
    this.clearValues();

    /* Output a comma separated line for each student with all their expenses */
    for (let expense of this.allExpenses) {
      // nasty type checking since amount is nullable
      let currExpense: string =
        expense.amount === null ? '0' : expense.amount.toString();

      this.totalCurrExpenses = this.totalCurrExpenses + parseFloat(currExpense);

      // either add new value to total, or initialize that student in the object
      if (this.allCurrExpenses[expense.name]) {
        this.allCurrExpenses[expense.name] =
          this.allCurrExpenses[expense.name].toString() + ', ' + currExpense;
      } else {
        this.allCurrExpenses[expense.name] = currExpense;
      }
    }
  }

  public clearForm(): void {
    this.clearValues();
  }

  public showTotals(): void {
    this.clearValues();
    const studentTotals: StudentTotal[] = this.calculateTotals();
    this.showStudentTotals.emit(studentTotals);
  }

  private calculateTotals(): StudentTotal[] {
    this.clearValues();

    /*** OMG - IT WAS CHANGING NUMBERS TO STRINGS EVEN WHEN STRONGLY TYPED AS NUMBERS OR PARSED TO FLOATS ***/
    /*** SO I HAD TO CAST EVERY NUMBER TO STRING AND THEN PARSE FLOAT TO GET THE MATH TO WORK ***/
    let totalStudents = 0;
    let totalExpense: string = '0';
    let totals: StudentTotal[] = [];
    let maxPaid = 0;
    let maxPayerName = '';

    // object with each student's name & running total
    let eachStudentsTotal: any = {};

    // replaces an api call to pull data from the back end
    for (let expense of this.allExpenses) {
      // nasty type checking since amount is nullable
      let currExpense: string =
        expense.amount === null ? '0' : expense.amount.toString();
      totalExpense = (
        parseFloat(totalExpense) + parseFloat(currExpense)
      ).toString();

      // build object -- key:  student name -- value: running total of expenses
      /*
        {
          Bill: 250,
          Todd: 325
        }
      */

      // either add new value to total, or initialize that student in the object
      if (eachStudentsTotal[expense.name]) {
        eachStudentsTotal[expense.name] =
          parseFloat(eachStudentsTotal[expense.name]) + parseFloat(currExpense);
      } else {
        totalStudents++;
        eachStudentsTotal[expense.name] = parseFloat(currExpense);
      }
    }

    const expensePerStudent: number = parseFloat(
      (parseFloat(totalExpense) / totalStudents).toFixed(2)
    );

    // figure out who pays who
    // use "for let... in" to use object's key
    for (let name in eachStudentsTotal) {
      let amountDue = expensePerStudent - parseFloat(eachStudentsTotal[name]);
      if (parseFloat(eachStudentsTotal[name]) >= maxPaid) {
        maxPaid = parseFloat(eachStudentsTotal[name]);
        maxPayerName = name;
      }

      totals.push({
        studentName: name,
        amountOwed: amountDue,
        owedTo: '',
      });
    }

    // set name of highest payer
    totals.forEach((total: StudentTotal) => (total.owedTo = maxPayerName));
    // filter out student who gets paid
    const payers: StudentTotal[] = totals.filter(
      (rec: StudentTotal) => rec.studentName !== maxPayerName
    );

    return payers;
  }

  private clearValues(): void {
    this.expense = {
      name: '',
      amount: null,
      invalidAmount: false,
      invalidName: false,
    };
  }
}
