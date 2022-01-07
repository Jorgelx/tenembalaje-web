import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductViewComponent } from './components/product-view/product-view.component';


const routes: Routes = [
  {path: '' , component: InicioComponent},
  {path: 'inicio' , component: InicioComponent},
  {path: 'product', component: ProductViewComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
