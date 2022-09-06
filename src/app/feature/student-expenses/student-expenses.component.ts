import { Component } from '@angular/core';
import { StudentExpense, StudentTotal } from 'src/app/shared/types';

@Component({
  selector: 'app-student-expenses',
  templateUrl: './student-expenses.component.html',
  styleUrls: ['./student-expenses.component.css'],
})
export class StudentExpensesComponent {
  public showTotals = false;
  public studentTotals: StudentTotal[] = [];
  public expense: StudentExpense = { name: '', amount: null };

  public showStudentTotals(totals: StudentTotal[]): void {
    this.studentTotals = totals;
    this.showTotals = true;
  }

  public hideStudentTotals(): void {
    this.showTotals = false;
  }
}
