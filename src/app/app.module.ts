import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NivelEducativoComponent } from './components/nivel-educativo/nivel-educativo.component';
import { ProfesorBuscarComponent } from './components/profesor/profesor-buscar/profesor-buscar.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ComoFuncionaComponent } from './components/como-funciona/como-funciona.component';
import { LoginComponent } from './components/login/login.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ProfesorPerfilComponent } from './components/profesor/profesor-perfil/profesor-perfil.component';
import './extensions';
import { AlumnoRegistroComponent } from './components/alumno/alumno-registro/alumno-registro.component';
import { FaqComponent } from './components/faq/faq.component';
import { TerminosComponent } from './components/legal/terminos/terminos.component';
import { PolicyComponent } from './components/legal/policy/policy.component';
import { AlumnoPerfilComponent } from './components/alumno/alumno-perfil/alumno-perfil.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IntercepterService } from "./modules/fwk/core/service/intercepter/intercepter.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    ContactoComponent,
    NivelEducativoComponent,
    ProfesorBuscarComponent,
    SobreNosotrosComponent,
    ComoFuncionaComponent,
    LoginComponent,
    ProfesorPerfilComponent,
    AlumnoRegistroComponent,
    FaqComponent,
    TerminosComponent,
    PolicyComponent,
    AlumnoPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
