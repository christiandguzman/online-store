import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  //anonymous users
  {path: '', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginComponent},

  //normal users
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:orderid', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  {path: 'check-out', component: CheckOutComponent , canActivate: [AuthGuard]},
  //admin
  
  {
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard,AdminAuthGuard]
  },
  {
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard,AdminAuthGuard]
  },
  {
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard,AdminAuthGuard]
  },
  {
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuard,AdminAuthGuard]
  },

  //{path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
