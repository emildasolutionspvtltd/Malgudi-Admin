import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { CrmComponent } from './crm/crm.component';
import { NewProductComponent } from './new-product/new-product.component';
import {SupplierComponent} from './supplier/supplier.component';
import { AuthGuard } from './auth.guard';
import { from } from 'rxjs';
import { CouponsComponent } from './coupons/coupons.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { VeiwDetailsComponent } from './veiw-details/veiw-details.component';


const routes: Routes = [
  { 
    path:'',
    component:LoginComponent
   },
    {
    

  path:'dash',
  canActivate:[AuthGuard],

  component:DashboardComponent,
  children:[
    {
      path:'',
    component:ProductsComponent
    },
    {
    path:'products',
    component:ProductsComponent,
    children:[
      {
        path:'editProduct',
        component:EditProductComponent
      }
    ]
 
  
  },

    {
      path:'orders',
      component:OrdersComponent,
      children:[
        {
          path:'veiwDetails',
          component:VeiwDetailsComponent
        },
        {
          path:'editcategories',
          component:EditCategoriesComponent
        }]
      
    },
    {
      path:'categories',
      component:CategoriesComponent
    },
    {
      path:'crm',
      component:CrmComponent
    },
    {
      path:'new-product',
      component:NewProductComponent
    },
    {
      path:'supplier',
      component:SupplierComponent
    },
    {
      path:'coupons',
      component:CouponsComponent
    }
   
  ]
},


{
  path:'login',
  component:LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
