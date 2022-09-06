import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './feature/payment/payment.component';
import { AboutComponent } from './feature/about/about.component';
import { CareersComponent } from './feature/careers/careers.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { OurClientsComponent } from './feature/our-clients/our-clients.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { StudentExpensesComponent } from './feature/student-expenses/student-expenses.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/payments',
    pathMatch: 'full',
  },
  {
    path: 'payments',
    component: PaymentComponent,
    pathMatch: 'full',
  },
  {
    path: 'expenses',
    component: StudentExpensesComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
  },
  {
    path: 'careers',
    component: CareersComponent,
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: OurClientsComponent,
    pathMatch: 'full',
  },
  {
    path: 'contact',
    component: ContactUsComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
