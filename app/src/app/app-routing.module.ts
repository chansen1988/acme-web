import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailRoutes } from './pages/emails';
import { ProductRoutes } from './pages/products';

const routes: Routes = [
  {
    children: EmailRoutes,
    path: 'emails'
  },
  {
    children: ProductRoutes,
    path: 'products'
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
