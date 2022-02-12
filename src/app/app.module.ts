import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CarritoItemComponent } from './components/carrito-item/carrito-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductoCrearComponent } from './components/producto-crear/producto-crear.component';
//interceptor
import { interceptorProvider } from './interceptor/prod-interceptor.service';
//external
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './components/loading/loading.component';
import { AnimacionPrincipalComponent } from './components/animacion-principal/animacion-principal.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    CarritoComponent,
    CarritoItemComponent,
    ModalComponent,
    ProductViewComponent,
    LoginComponent,
    RegistroComponent,
    ProductoCrearComponent,
    LoadingComponent,
    AnimacionPrincipalComponent,
    NoticiasComponent,
    NoticiaComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxPayPalModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })

  ],
  providers: [interceptorProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
