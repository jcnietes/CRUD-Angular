import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },

  {
    path: 'Login',
    component: LoginComponent
  },

  {
    path: 'Register',
    component: RegisterComponent
  },

  {
    path: 'Update/:id',
    component: AddProductComponent
  },

  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Employee',
        component: EmployeeListComponent
      },
      {
        path: 'Product',
        component: ProductListComponent
      }
    ]
  },

  // {
  //   path: 'Employee',
  //   component: EmployeeListComponent
  // },

  // {
  //   path: 'Product',
  //   component: ProductListComponent,
  //   // 
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
