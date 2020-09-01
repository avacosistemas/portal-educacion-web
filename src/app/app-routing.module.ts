import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfesorBuscarComponent } from './components/profesor/profesor-buscar/profesor-buscar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfesorScheduleComponent } from './components/profesor/profesor-schedule/profesor-schedule.component';
import { AlumnoRegistroComponent } from './components/alumno/alumno-registro/alumno-registro.component';
import { FaqComponent } from './components/faq/faq.component';
import { PolicyComponent } from './components/legal/policy/policy.component';
import { TerminosComponent } from './components/legal/terminos/terminos.component';
import { AlumnoPerfilComponent } from './components/alumno/alumno-perfil/alumno-perfil.component';
import { ProfesorRegistroComponent } from './components/profesor/profesor-registro/profesor-registro.component';
import { ProfesorPerfilComponent } from './components/profesor/profesor-perfil/profesor-perfil.component';
import { PwdResetComponent } from './components/auth/pwd-reset/pwd-reset.component';
import { PwdChangeComponent } from './components/auth/pwd-change/pwd-change.component';
import { UsuarioWelcomeComponent } from './components/usuario/usuario-welcome/usuario-welcome.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil/usuario-perfil.component';
import { ClaseDetalleComponent } from './components/clase/clase-detalle/clase-detalle.component';
import { ClaseAlumnosComponent } from './components/clase/clase-alumnos/clase-alumnos.component';


const routes: Routes = [
  {path: 'alumno/nuevo', component: AlumnoRegistroComponent, pathMatch: 'full'},
  {path: 'alumno/:id', component: AlumnoPerfilComponent, pathMatch: 'full'},
  {path: 'buscar/:nivel/:id', component: ProfesorBuscarComponent, pathMatch: 'full'},
  {path: 'buscar/:nivel', component: ProfesorBuscarComponent, pathMatch: 'full'},
  {path: 'buscar', component: ProfesorBuscarComponent, pathMatch: 'full'},
  {path: 'clase/detalle/:id', component: ClaseDetalleComponent, pathMatch: 'full'},
  {path: 'clase/:id/alumnos', component: ClaseAlumnosComponent, pathMatch: 'full'},
  {path: 'faq', component: FaqComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'legales/politica', component: PolicyComponent, pathMatch: 'full'},
  {path: 'legales/terminos', component: TerminosComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'pwdreset', component: PwdResetComponent, pathMatch: 'full'},
  {path: 'pwdchange', component: PwdChangeComponent, pathMatch: 'full'},
  {path: 'profesor/registro', component: ProfesorRegistroComponent, pathMatch: 'full'},
  {path: 'profesor/agenda/:id', component: ProfesorScheduleComponent, pathMatch: 'full'},
  {path: 'profesor/:id', component: ProfesorPerfilComponent, pathMatch: 'full'},
  {path: 'usuario/:id', component: UsuarioPerfilComponent, pathMatch: 'full'},
  {path: 'welcome/:id', component: UsuarioWelcomeComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
