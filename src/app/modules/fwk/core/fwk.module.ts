import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwkInterceptor } from './service/security/jwk-interceptor';
import { RestrictionKeysDirective } from './directive/restriction-keys.directive';
import { SanitizeHtmlPipe } from './directive/sanitize-html.pipe';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { FileComponent } from './components/file/file.component';

@NgModule({
  imports: [CommonModule,
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule],
  entryComponents: [
                    ],
  declarations: [
                 RestrictionKeysDirective,
                 SanitizeHtmlPipe,
                 FieldErrorDisplayComponent,
                 FileComponent],
  exports: [SanitizeHtmlPipe,
            CommonModule,
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule,
            FieldErrorDisplayComponent],
  providers: [{
                provide: HTTP_INTERCEPTORS,
                useClass: JwkInterceptor,
                multi: true
              }
  ]
})
export class FwkModule {}
