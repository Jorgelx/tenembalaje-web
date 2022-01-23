import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component';
import { RegistroComponent } from './components/registro/registro.component';


const routes: Routes = [
  {path: '' , component: InicioComponent},
  {path: 'inicio' , component: InicioComponent},
  {path: 'product', component: ProductViewComponent},
  {path: 'loading', component: LoadingComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'crear-producto' , component: ProductoCrearComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
