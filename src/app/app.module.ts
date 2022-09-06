import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponent } from './feature/payment/payment.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PaymentFormComponent } from './feature/payment-form/payment-form.component';
import { AboutComponent } from './feature/about/about.component';
import { CareersComponent } from './feature/careers/careers.component';
import { OurClientsComponent } from './feature/our-clients/our-clients.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { CurrencyOrDefaultPipe } from './shared/pipes/currency-or-default.pipe';
import { StudentExpensesComponent } from './feature/student-expenses/student-expenses.component';
import { ExpenseFormComponent } from './feature/expense-form/expense-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PaymentFormComponent,
    AboutComponent,
    CareersComponent,
    OurClientsComponent,
    ContactUsComponent,
    CurrencyOrDefaultPipe,
    StudentExpensesComponent,
    ExpenseFormComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
