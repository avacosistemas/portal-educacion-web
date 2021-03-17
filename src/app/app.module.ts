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
import { LoginComponent } from './components/auth/login/login.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ProfesorScheduleComponent } from './components/profesor/profesor-schedule/profesor-schedule.component';
import './extensions';
import { AlumnoRegistroComponent } from './components/alumno/alumno-registro/alumno-registro.component';
import { FaqComponent } from './components/faq/faq.component';
import { TerminosComponent } from './components/legal/terminos/terminos.component';
import { PolicyComponent } from './components/legal/policy/policy.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IntercepterService } from './modules/fwk/core/service/intercepter/intercepter.service';
import { FwkModule } from './modules/fwk/core/fwk.module';
import { ProfesorRegistroComponent } from './components/profesor/profesor-registro/profesor-registro.component';
import { OnlyNumber } from "./directives/only-number.directive";
import { TerminosDetalleComponent } from './components/legal/terminos/terminos-detalle/terminos-detalle.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AlumnoListComponent } from './components/alumno/alumno-list/alumno-list.component';
import { PwdChangeComponent } from './components/auth/pwd-change/pwd-change.component';
import { PwdResetComponent } from './components/auth/pwd-reset/pwd-reset.component';
import { FooterComponent } from './components/main-nav/footer/footer.component';
import { HeaderComponent } from './components/main-nav/header/header.component';
import { JwkInterceptor } from "./modules/fwk/core/service/security/jwk-interceptor";
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { UsuarioWelcomeComponent } from './components/usuario/usuario-welcome/usuario-welcome.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil/usuario-perfil.component';
import { UsuarioPerfilEditComponent } from './components/usuario/usuario-perfil-edit/usuario-perfil-edit.component';
import { UsuarioPerfilClasesComponent } from './components/usuario/usuario-perfil-clases/usuario-perfil-clases.component';
import { ClaseDetalleComponent } from './components/clase/clase-detalle/clase-detalle.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RaitingGridComponent } from './components/usuario/usuario-perfil-clases/raiting-grid/raiting-grid.component';
import { UsuarioCalificacionesComponent } from './components/usuario/usuario-calificaciones/usuario-calificaciones.component';
import { ClaseAlumnosComponent } from './components/clase/clase-alumnos/clase-alumnos.component';
import { UsuarioAulasAbiertasComponent } from './components/usuario/usuario-aulas-abiertas/usuario-aulas-abiertas.component';


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
    ProfesorScheduleComponent,
    AlumnoRegistroComponent,
    FaqComponent,
    TerminosComponent,
    PolicyComponent,
    ProfesorRegistroComponent,
    OnlyNumber,
    TerminosDetalleComponent,
    AlumnoListComponent,
    PwdChangeComponent,
    PwdResetComponent,
    FooterComponent,
    HeaderComponent,
    PreguntasComponent,
    HeaderComponent,
    UsuarioWelcomeComponent,
    UsuarioPerfilComponent,
    UsuarioPerfilEditComponent,
    UsuarioPerfilClasesComponent,
    ClaseDetalleComponent,
    RaitingGridComponent,
    UsuarioCalificacionesComponent,
    ClaseAlumnosComponent,
    UsuarioAulasAbiertasComponent,
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
    FormsModule,
    // ============ Recapcha ============
    RecaptchaModule,
    RecaptchaFormsModule,
    // ============ Core ============
    FwkModule,
    Ng2SmartTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwkInterceptor,
      multi: true
    }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
